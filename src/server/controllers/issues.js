const fs = require('fs')
const { readFile, writeFile } = require('node:fs/promises')
const { resolve } = require('node:path')
const crypto = require('node:crypto')
const { parse } = require('csv-parse')
const { stringify } = require('csv-stringify/sync')

const csvPath = resolve(`${__dirname}/../issues.csv`)
const csvPathTemp = resolve(`${__dirname}/../issues_temp.csv`)

const parserOptions = {
    delimiter: ';',
    columns: ['id', 'description', 'link', 'parentId', 'status', 'timestamp'],
}

exports.list = async (req, res) => {
    try {
        const data = await readFile(csvPath, 'utf-8')
        parse(data, parserOptions, (err, csvParsed) => {
            if (err) {
                throw err
            }
            return res.status(200).send(csvParsed)
        })
    } catch (e) {
        return res.status(500).send(e)
    }
}

exports.stream = (req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    fs.createReadStream(csvPath, { encoding: 'utf-8' })
        .pipe(parse(parserOptions))
        .on('data', function (row) {
            res.write(`data: ${JSON.stringify(row)}\n\n`)
        })

    res.on('close', () => {
        res.end()
    })
}

exports.create = async (req, res) => {
    const data = req.body
    const uuid = crypto.randomUUID()

    const issue = {
        id: uuid,
        description: data.description,
        link: data.link,
        parentId: data.parentId,
        status: 'open',
        timestamp: Date.now(),
    }

    const csvDataString = stringify([issue], parserOptions)

    await writeFile(csvPath, csvDataString, { flag: 'a' })

    res.set(201).send(issue)
}

exports.close = (req, res) => {
    const issueId = req.params.id
    const readStream = fs.createReadStream(csvPath, { encoding: 'utf-8' })
    const writeStream = fs.createWriteStream(csvPathTemp, { encoding: 'utf-8' })

    readStream.pipe(parse(parserOptions)).on('data', (issue) => {
        if (issue.id === issueId) {
            issue.status = 'closed'
        }
        writeStream.write(stringify([issue], parserOptions))
    })

    readStream.on('end', () => {
        writeStream.end()
        fs.renameSync(csvPathTemp, csvPath)
        res.set(202).send()
    })
}
