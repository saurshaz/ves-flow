'use strict;'

import handlers from './handlers'
import store from './store'

//  TODO :: PIECE#1 EVENTS MAPPING CONFIG
module.exports = {
  setupEvents: (context) => {
    // riot.mount('*')
    let domain = context.opts.domain
    let page = context.opts.page

    if (domain && page) {
      for (let idx in this[page]) {
        let event_json = this[page][idx]
        let handler = event_json.handler
        context.root.querySelector(context.root.name + ' ' + event_json.selector).addEventListener(event_json.event, handlers[page][handler].bind(self._, event_json.passedValues, store, (err, result) => {
          context.update()
          console.log('err -> ', err, ' result-> ', context._)
        }))
      }
    }
  },
  login: [
    {
      selector: 'button#submitLogin',
      event: 'click',
      signal: '',
      handler: 'handleLogin',
      state: self._,
      passedValues: [{
        type: 'dom',
        key: 'userId',
        selector: 'input#userid',
      }, {
        type: 'dom',
        key: 'userPassword',
        selector: 'input#password',
      }]
    },
    {
      selector: 'button#resetLogin',
      event: 'click',
      signal: '',
      handler: 'handleResetLogin',
      state: self._,
      passedValues: []
    }
  ]
}
