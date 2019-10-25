const express = require('express')
const morgan = require('morgan')
var cors = require('cors');

const app = express()
app.use(morgan('tiny'))
app.use(express.json())

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

const server = app.listen(4000, () => {
    console.log('listening on port %s...', server.address().port);
});