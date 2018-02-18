const express = require('express');
const app = express();
const server = app.listen(1000, on);
function on() { // funcion callback
    console.log('servidor encendido');

}
app.use(express.static('public'));