import dotenv from 'dotenv'
dotenv.config()

import app from './App'
import config from './config/config'

import { createServer } from 'http'
import { Server } from 'socket.io'
import socketHandler from './socket/socketHandler'

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

socketHandler(io)

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
