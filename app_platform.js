// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://13.124.66.222:27017/ilcg-platform?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

/**
 * 서버 정보
 */
var ServerInfoSchema = new mongoose.Schema({
    id: String,
    app_ver: { type: Object, of: mongoose.Schema.Types.Mixed }
}, {versionKey : false });
var ServerInfo = mongoose.model('serverInfo', ServerInfoSchema, 'serverInfo');

app.get('/server_info', (req, res) => {
    const reqAppVer = req.query.app_ver;
    console.log('Requested app version:', reqAppVer);
    ServerInfo.findOne({}, (err, doc) => {
        if (err || !doc) {
            return res.status(500).json({ error: 'Server info not found' });
        }
        const appVerMap = doc.app_ver || {};
        let result = {};
        if (reqAppVer && appVerMap.hasOwnProperty(reqAppVer)) {
            const data = appVerMap[reqAppVer];
            result[reqAppVer] = {
                name: data.name,
                api: data.api
            };
            res.json({
                code: 1,
                msg: "success",
                data: result
            });
        } else {
            res.json({
                code: -99,
                msg: "app_ver not found",
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});