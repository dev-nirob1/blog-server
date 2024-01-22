const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const corsOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
// middleware
app.use(cors(corsOption))
app.use(express.json())



app.get('/', (req, res) => {
    res.send('let`s build great things!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})