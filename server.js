const express = require('express');
const app = express();
const PORT = 8000; // Use uppercase for constant variable
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors()); // Use app.use() for middleware

const userRoute = require('./routes/user.route');
app.use('/user', userRoute); 
const kamarRoute = require('./routes/kamar.route');
app.use('/kamar', kamarRoute); 
const tipe_kamarRoute = require('./routes/tipe_kamar.route');
app.use('/tipe_kamar', tipe_kamarRoute); 
const pemesananRoute = require('./routes/pemesanan.route');
app.use('/pemesanan', pemesananRoute); 
const detail_pemesananRoute = require('./routes/detail_pemesanan.route');
app.use('/detail_pemesanan', detail_pemesananRoute); 
app.listen(PORT,() => {
    console.log('jalan jalan 8000')
} )
