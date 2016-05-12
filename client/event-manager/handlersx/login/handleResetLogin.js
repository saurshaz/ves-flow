'use strict'
let handleResetLogin = (data, store, cb, event) => {
  data = filterData(data)
  this.userId = ' '
  this.userPassword = ' '
  store.setState('user', 'authStatus', false)
  console.log(this)
  cb(null, this)
}
module.exports = handleResetLogin
