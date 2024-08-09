const express = require('express')
const cors = require('cors')
const router = require('./routes.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
