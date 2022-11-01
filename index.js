
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/build'));

app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
