'use strict'
let handleLogin = (data, store, cb, event) => {
  data = filterData(data)
  console.log(this)
  if (data.userId === 'saurshaz' && data.userPassword === 'password') {
    this.userId === ' '
    this.userPassword === ' '
    this.me = data.userId
    store.setState('user', 'authStatus', true)
  } else {
    store.setState('user', 'authStatus', false)
  }
  cb(null, this)
}

module.exports = handleLogin
