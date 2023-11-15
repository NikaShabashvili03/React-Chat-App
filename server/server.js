import express from 'express';
import { createServer } from 'node:http';
import { PrismaClient } from './prisma/generated-client/index.js'
import { Server } from 'socket.io';

const prisma = new PrismaClient();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5100;

const io = new Server(server, {
    cors: {
        origin: "https://classy-malabi-3aab9f.netlify.app",
        methods: ["GET", "POST"]
    }
});


app.get("/api/message", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const messages = await prisma.message.findMany();
    res.status(200).send(messages);
})

app.post("/api/message/delete", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const messages = await prisma.message.deleteMany();
  res.status(200).send(messages);
})

let users = [];

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
  socket.on('message', async (data) => {
      if (data) {
          io.emit('messageResponse', data);
          await prisma.message.create({
              data: {
                  text: data.text,
                  name: data.name,
                  socketID: data.socketID,
              },
          })
      }
  });

  socket.on('newUser', (data) => {
    users.push(data);
    io.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.io !== socket.id);
    io.emit('newUserResponse', users);
    socket.disconnect();
  });
});

server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});