import * as admin from 'firebase-admin'

export const AdminSdk = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL!,
    projectId: process.env.PROJECT_ID!,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

export { admin }
