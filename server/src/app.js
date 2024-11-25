const express = require('express');
const app = express();
const notificationsRouter = require('./routes/notifications');

app.use(express.json());
app.use('/notifications', notificationsRouter);

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});