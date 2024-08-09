const express = require('express')
const issuesController = require('./controllers/issues')

const router = express.Router()

router.get('/issues', (req, res) => {
    return issuesController.list(req, res)
})

router.get('/issues/:id', (req, res) => {
    return issuesController.get(req, res)
})

router.patch('/issues/:id', (req, res) => {
    issuesController.update(req, res)
})

router.post('/issues', (req, res) => {
    issuesController.create(req, res)
})

module.exports = router
