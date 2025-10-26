require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
    } catch (err) {
        console.error('Unable to connect to DB:', err);
    }
})();