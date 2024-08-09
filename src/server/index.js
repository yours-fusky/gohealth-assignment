const express = require('express')
const router = require('./routes.js')

const app = express()
const port = 3000

app.use(express.json())

app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
