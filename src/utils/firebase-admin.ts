import * as admin from 'firebase-admin'

const serviceAccount = require('./yeamazing-partner-firebase-adminsdk.json')

export const AdminSdk = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export { admin }
