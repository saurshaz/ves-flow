
#########################################################
##  **V**iews (configurable)**E**vents **S**tate       ##
#########################################################

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

#### How a component logic looks ?
	 

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



| DOM Selector | Events | Emit Signal | Handler (has state and logic to change that, emits event at end) | Store (state changes)| Views Affected (Views watche for state changes and adjust) |
| --- | --- | --- | --- | --- | --- | --- |  ---|
|   `button#login`   |   `click`    |   `-X-`   | `app.user.handleLogin` & `login_success` or `login_failure`  | `-X-` |
| `-X-`  | `-X-` | `login_success` | `app.user.stateChanged`  | `UserStore`, `AuthStore` | `LoginView`, `HomeView` |
| `-X-`  | `-X-` | `login_failure` | `app.user.stateChanged` |  `AuthStore` |  `LoginView` |
