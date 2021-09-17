const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '/dist/myapp/')));
app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/myapp/' }
    );
});
app.listen(process.env.PORT || 8000);