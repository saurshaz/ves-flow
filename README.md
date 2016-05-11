
#########################################################
##  **V**iews (configurable)**E**vents **S**tate       ##
#########################################################

- Example at http://saurshaz.github.io/ves-flow/#login?domain=user&page=login

## Setup ?

-	install dependencies `npm i`
-	move `node_modules` folder to a folder above the current one (Pls do not ask why ?:-))
-	start the app by `npm run dev`
-	go to `http://localhost:8080/#login?domain=user&page=login`



## What is this ?
- An attempt to make app creation faster and segregate concerns involved
- Steps to be there in an App development could be
	- - create views (`presentation layer`)
	- - hook up `events` into those views
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







| DOM Selector | Events | Emit Signal | Handler (has state and logic to change that, emits event at end) | Store (state changes)| Views Affected (Views watche for state changes and adjust) |
|--|--|--|--|--|--|
|   `button#login`   |   `click`    |   `-X-`   | `app.user.handleLogin` & `login_success` or `login_failure`  | `-X-` |
| `-X-`  | `-X-` | `login_success` | `app.user.stateChanged`  | `UserStore`, `AuthStore` | `LoginView`, `HomeView` |
| `-X-`  | `-X-` | `login_failure` | `app.user.stateChanged` |  `AuthStore` |  `LoginView` |
