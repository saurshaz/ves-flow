'use strict'

import handlers from '../handlers'
import events from '../events'
import store from '../store'
import PubSub from '../pubsub'

module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  init: function (stores) {
    // this.on('updated', function () { console.log('Updated!') })

    let self = this
    self.state = store.init()
    self._ = self.state

    // / setup all events
    PubSub.publish('setup_all_events', {context: self})

    self.on('mount', function () {
      let identifier = self.root.getAttribute('data-is')
      // todo : try to get this stores from init param only
      self.stores.map((item, i) => {
        //  todo :: validation needed shall be fetched from module name
        // debugger
        PubSub.subscribe(item + '_updated', (data) => {
          for (let i in self.validationform) {
            if (data.key === self.validationform[i] && data.val.validated && data.val.validated === true) {
              PubSub.publish(identifier + '_setup_events', {context: self})
            } else if (data.key === self.validationform[i] && data.val.validated && data.val.validated !== true) {
              PubSub.publish(identifier + '_destroy_events', {context: self})
            }
          }

          console.debug(' update data >>> ', data)
          self['_'][data.module][data.key] = data.val
          self.update()
        })
      })

      if (identifier && handlers[identifier] && handlers[identifier].onmount && (typeof handlers[identifier].onmount === 'function')) {
        handlers[identifier].onmount.call(self, {page: identifier, domain: self.opts.domain}, store, null, null)
      }
    })

    self.validate = () => {
      let identifier = this.opts.dataIs
      if (identifier && handlers[identifier] && handlers[identifier].validate && (typeof handlers[identifier].validate === 'function')) {
        handlers[identifier].validate.call(self, {page: identifier, domain: self.opts.domain}, store, null, null)
      }
    }
  }
}
