import * as admin from 'firebase-admin'

export const AdminSdk = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL!,
    privateKey: process.env.PRIVATE_KEY!,
    projectId: process.env.PROJECT_ID!,
  }),
})

export { admin }
