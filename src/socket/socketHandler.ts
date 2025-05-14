import { Server, Socket } from 'socket.io'

const onlineUsers = new Map<string, string>() // userId -> socketId

export default function socketHandler(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`New socket connected: ${socket.id}`)

    socket.on('user-online', (userId: string) => {
      onlineUsers.set(userId, socket.id)
      console.log('emitting online users =>', onlineUsers)
      io.emit('update-user-status', Array.from(onlineUsers.keys()))
    })

    socket.on('disconnect', () => {
      for (const [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId)
          break
        }
      }
      io.emit('update-user-status', Array.from(onlineUsers.keys()))
    })

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err)
    })
  })
}
