const express = require('express')

const connection = require('../helper/db')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM project'
  connection.query(sql, (err, projects) => {
    if (err) throw err
    res.status(200).send(projects)
  })
})

module.exports = router