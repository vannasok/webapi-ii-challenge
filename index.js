const express = require('express');
const route = require('./routes/route.js');

const server = express();
server.use(express.json());

server.use('/api/posts', route);

const port = 8888;
server.listen(port, () => console.log('\n ###### server on 8888 ###### '));
