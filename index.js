const express = require('express');
const app = express();
const port = process.env.PORT || 80;


app.get('/', (req, resp)=>resp.end('Hello, world!'));

app.listen(port);
