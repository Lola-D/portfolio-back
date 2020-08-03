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

router.get('/:id', (req, res) => {
  const value = [req.params.id]
  const sql = 'SELECT  * FROM project WHERE id =  ?'
  connection.query(sql, value, (err, result) => {
    if (err) throw err
    res.status(200).send(result[0])
  })
})

router.post('/', (req, res) => {
  const { name, description, githubUrl, projectUrl, preview } = req.body
  const values = [
    name,
    description,
    githubUrl,
    projectUrl,
    preview
  ]
  const sql =
    `INSERT INTO project (name, description, github_url, project_url, preview) 
      VALUES (?, ?, ?, ?, ?)`
  connection.query(sql, values, err => {
    if (err) throw err
    res.sendStatus(201)
  })
})

router.put('/:id', (req, res) => {
  const { name, description, githubUrl, projectUrl, preview } = req.body
  const values = [
    name,
    description,
    githubUrl,
    projectUrl,
    preview,
    req.params.id
  ]
  const sql =
    `UPDATE project 
      SET 
        name =  ?,
        description =  ?,
        githubUrl =  ?,
        projectUrl =  ?,
        preview =  ?
    WHERE id = ?`
  connection.query(sql, values, err => {
    if (err) throw err
    res.sendStatus(201)
  })
})

module.exports = router