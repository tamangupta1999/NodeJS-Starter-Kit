const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../utils');

/*
 * Load routes statically and/or dynamically
 */


// Loop routes path and loads every file as a route except this file
fs.readdirSync(routesPath).filter(file => {
  const routeFile = removeExtensionFromFile(file)
  return routeFile !== 'index' ? router.use(`/${routeFile}`, require(`./${routeFile}`)) : ''
})


/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router