const express = require('express')
const issuesController = require('./controllers/issues')
const fs = require('fs')

const router = express.Router()

router.get('/issues', (req, res) => {
    return issuesController.list(req, res)
})

router.get('/issues/stream', (req, res) => {
    return issuesController.stream(req, res)
})

router.post('/issues/:id/close', (req, res) => {
    return issuesController.close(req, res)
})

router.post('/issues', (req, res) => {
    return issuesController.create(req, res)
})

module.exports = router
