
#########################################################
##  **V**iews (configurable)**E**vents **S**tate       ##
#########################################################


--- DEPRECATED --- 

[![Join the chat at https://gitter.im/saurshaz/ves-flow](https://badges.gitter.im/saurshaz/ves-flow.svg)](https://gitter.im/saurshaz/ves-flow?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

- Example at http://saurshaz.github.io/ves-flow/#login?domain=user&page=login

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)



## Setup ?

-	install dependencies `npm i`
-	move `node_modules` folder to a folder above the current one (Pls do not ask why ?:-))
-	start the app by `npm start`
-	go to `http://localhost:8080/#login?domain=user&page=login`
-   `npm run dev` for dev mode hot setup (in this case go to `http://localhost:8080/#login?domain=user&page=login`)


## What is this ?
- An attempt to make app creation faster and segregate concerns involved
- Steps to be there in an App development could be
	- - create views (`presentation layer`)
	- - mention stores array to watch in the view `script` portion use `StoreWatcherMixin`
	- - hook up `events` into those views using `event-manager\evens` config file
	- - keep `state` always at a central `store` (inspired by Flux architectures)
	- - make the above process run with any view technology, and with and framework (as long as it's Javascript)
	- - discourage `events` to `handler` binding within views. Keep all `handlers` at a seperate place in codebase(probably addable by a different developer)
	- - discourage internal component `state` .Alsways operate on & keep watching `state` kept at a global location. maintain watching of interested `state` parts. No need to watch entire state for one update


## Support welcome ##
## It's a work in progress ##
## Feedback/suggestions welcome, create an issue ##


![Demo](/demo.gif)

#### Some Disclaimers
- This is not **Flux**, but has borrowed many things from **Flux** & **redux**
- This is not **PubSub** only, but some part of it is
- Here's a mind-map of the system. A more detailed arch-diagram will be there as things evolve

#### How a View logic looks ?
	 

```
	import StoreWatcher from '../event-manager/mixins/storex'

	<comp1>
		<div>
			<p> Hello World </p>
			.... ... 
		</div>
	</comp1>

	 let self = this

     // for validations
     //  - add a validationform
     //  - add a validate function in the handlers['<tag-name>'] section to set result
     //                into state.<store>.<validationform>.validated property
     self.stores = ['user'] // stores to watch
     self.validationform = ['loginform'] // validation form . this will have validated field

     // for store watching
     // import StoreWatcher from ../../event-manager/mixins/storex
     // self.mixin(StoreWatcher)
     self.mixin(StoreWatcher)
```

#### In addition to the Views, you'll have Handlers, Events and Store
##### You'll interact with these in following manner

- **Handlers**
 - - Each `View` will have one or more handlers it will interact with 
 - - `Handlers` are where logic will be written (including DOM selectors) and value fetching. 
 - - `handlers.js` will need be modified to add your logic. Logic will look like - 
 ```
	var handlers = {}
	handlers['login'] = {}
	handlers['login'].handleLogin = function (data, store, cb, event) {
	  let context = this
	  data.userId = document.querySelector('[data-is="' + data.page + '"] ' + 'input#userid').value
	  data.userPassword = document.querySelector('[data-is="' + data.page + '"] ' + 'input#password').value

	  if (data.userId === 'saurshaz' && data.userPassword === 'password') {
	    store.setState('user', 'userId', '')
	    store.setState('user', 'userPassword', '')
	    store.setState('user', 'me', data.userId)
	    store.setState('user', 'authStatus', true)
	  // todo : the screen shall ideally change now
	  } else {
	    store.setState('user', 'userId', data.userId)
	    store.setState('user', 'userPassword', data.userPassword)
	    store.setState('user', 'me', data.userId)
	    store.setState('user', 'authStatus', false)
	  }
	  cb(null, this)
	}

	.... 
	.... 

	and so on.. multiple entries

	- data, store, cb, event are the inputs
	- You'll get data - domain name and page name
	- cb will be the flow return callback that u will use. expects (err, res)
	- store will be the centrat store for the app (covered below)
	- event is something that will seldom be needed to be touched (Advanced usage)

 ```



- **Store**
 - - Each `View` will be watching none or many `stores` (that are defined in the `StoreWatcherMixin` in the `View` layer component)
 - - You just need to add the store structure for your view in the universal Store JSON in `store.json` 
 - - store.js relavent code will look like - 
 	```
	let state = {
	  global: {}, fyler: {request: '',requestjson: {}, response: '', err: ''}, user: {authStatus: false, userId: '', userPassword: '', loginform: {validated: false}}, misc: {}
	}
	```
 - - Other than this, nothing needs be touched in store.js


- **Events** 
	- - this will be the configurable `events` matching map for each `view` with all it's `events` and `handlers`
	- - basically you'll declare in JSON terms, different `events` and associated `handlers` that you want to bind to in a `view` layer
	- - `events.js` relavent code will look like - 
		```

	let eventsConfig = {}

	// login components config
	eventsConfig.login = []
	eventsConfig.login.push({
	  selector: {
	    nodename: 'BUTTON',// type of node in capitals
	    nodeid: 'submitLogin'// id value
	  },
	  event: 'click',// what event
	  handler: 'handleLogin'// handler callable on this event
	})

	eventsConfig.login.push({
	  selector: {
	    nodename: 'BUTTON',// type of node in capitals
	    nodeid: 'resetLogin'// id value
	  },
	  event: 'click',// what event
	  handler: 'handleResetLogin'// handler callable on this event
	})
	```

## Look at Issues for How this is fast-changing :-) ##

**Thanks**


