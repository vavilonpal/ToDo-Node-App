const jwt = require("jsonwebtoken");
const logger = require("./logger");

module.exports = (io) => {

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("NO_TOKEN"));
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = payload;
            next();
        } catch (err) {
            next(new Error("INVALID_TOKEN"));
        }
    });

    io.on("connection", (socket) => {
        logger.info(`🔌 WebSocket подключён: ${socket.user.email}`);

        socket.emit("connected", {
            message: `Добро пожаловать, ${socket.user.email}!`
        });

        socket.on("disconnect", () => {
            logger.info(` WebSocket отключён: ${socket.user.email}`);
        });
    });
};

