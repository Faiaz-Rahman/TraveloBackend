import { Request, Response } from 'express'
import { admin } from '../utils/firebase-admin'

export const notifyUser = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userid as string
    console.log('the user id got in the request is =>', userId)

    if (!userId) {
      res.status(400).json({ message: 'userid is missing in query parameter' })
    }

    const snapshot = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get()

    if (!snapshot.exists) {
      res.status(401).json({
        message: 'Unauthorized! user does not exist ...',
      })
    }

    const targetFcm = snapshot.data()?.fcm
    const username = snapshot.data()?.name

    await admin.messaging().send({
      token: targetFcm,
      data: {
        notifee: JSON.stringify({
          title: 'Yeamazing',
          body: `Received a new message from ${username}`,
          android: {
            channelId: 'default',
            actions: [
              {
                title: 'Mark as read',
                pressAction: {
                  id: 'read',
                },
              },
            ],
          },
        }),
      },
    })

    res.status(200).json({
      message: `notification sent to ${userId}`,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!!!' })
  }
}
