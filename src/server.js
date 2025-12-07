require('dotenv').config();
const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const { sequelize } = require('./models');
const socketClient = require('./utils/socketClient');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const { Server } = require('socket.io');

const io = new Server(server, {
    cors: { origin: "*" }
});

// Подключаем логику WebSocket
require('./utils/socket')(io);
socketClient.setIo(io);
module.exports = { io };


(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    } catch (err) {
        console.error('Unable to connect to DB:', err);
    }
})();
