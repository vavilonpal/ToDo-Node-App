// utils/socketClient.js
let ioInstance = null;

function setIo(io) {
    ioInstance = io;
}

function getIo() {
    if (!ioInstance) throw new Error('io not initialized');
    return ioInstance;
}

module.exports = { setIo, getIo };
