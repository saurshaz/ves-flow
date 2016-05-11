
#########################################################
##  **V**iews (configurable)**E**vents **S**tate       ##
#########################################################

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


The example is achieving cross-component communication using the above methodology (`ves`)

![Demo](/demo.gif)
