import { Server, Socket } from 'socket.io'

interface userData {
  userId: string
  username: string
  imageUrl: string | null
  email: string
}

interface onlineUsersData extends userData {
  socketId: string
}

const onlineUsers = new Map<string, onlineUsersData>() // userId -> onlineUsersData

export default function socketHandler(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`New socket connected: ${socket.id}`)

    socket.on('user-online', (userData: userData) => {
      onlineUsers.set(userData.userId, {
        socketId: socket.id,
        imageUrl: userData.imageUrl,
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
      } as onlineUsersData)

      console.log('==> emitting online users =>', onlineUsers)

      io.emit('update-user-status', Array.from(onlineUsers.values()))
    })

    socket.on('disconnect', () => {
      for (const [userId, userdata] of onlineUsers.entries()) {
        if (userdata.socketId === socket.id) {
          onlineUsers.delete(userId)
          break
        }
      }
      io.emit('update-user-status', Array.from(onlineUsers.values()))
    })

    socket.on('connect_error', (err) => {
      console.error('==> Socket connection error:', err)
    })
  })
}
