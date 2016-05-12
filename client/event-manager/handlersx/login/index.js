'use strict'
import path from 'path'
let fs = require('fs-web')
module.exports = {
  handleLogin: require(path.join('event-manager', 'handlers', 'login', 'handleLogin')),
  handleResetLogin: require(path.join('event-manager', 'handlers', 'login', 'handleResetLogin'))
}
