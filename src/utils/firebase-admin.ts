import * as admin from 'firebase-admin'

// export const AdminSdk = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

export const AdminSdk = admin.initializeApp({
  projectId: process.env.PROJECT_ID,
  serviceAccountId: process.env.CLIENT_EMAIL,
})

export { admin }
