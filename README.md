# Gulp Starter Pack
This package intended to solve common front-end development tasks. Works best for psd/sketch to html projects and save you a lot of time setting up local environment

## Demo page
https://projectname.surge.sh (change name in package.json)

## How to start
* `yarn` - install npm dependencies
* `bower install` - install bower packages
* `gulp` - run dev-server
* `gulp build` - build project from sources

## List of Gulp tasks
To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:development`| build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. Included [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer), flexbugs and other cool [plugins](https://github.com/postcss/postcss#plugins) you might add
`pug`              | compile [pug](http://pug-js.com/) templates
`javascript`       | combines vendor files and custom .js code into separate files
`sprite:svg`       | create svg symbol sprites
`sprite:png`       | create png sprites
`images`           | optimize, minify and clone images
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./dist` folder
`copy`             | copy common files from `./src` path to `./dist` path
`list-pages`       | create index file with links to all project pages

All available tasks are placed in a folder `./gulp/tasks` as separate **.js** files.

## Flags

* `gulp --open` or `gulp server --open` - run dev server and then open preview in browser
* `gulp --tunnel=[name]` or `gulp server --tunnel [name]` - runs dev server and allows you to easily share a web service on your local development machine (powered by [localtunnel.me](https://localtunnel.me/)). Your local site will be available at `[name].localtunnel.me`.
* `gulp [task_name] --prod` or `gulp [task_name] --production` - run task in production mode. Some of the tasks (like, sass or js compilation) have additional settings for production mode (such as code minification), so with this flag you can force production mode. `gulp build` uses this mode by default.


## Deploy
There are git hooks for [surge](https://surhe.sh) deploy. Every push will execute deploy to specific surge domain of **./dist** folder

Exmaple:
`surge --project ./dist --domain projectname.surge.sh`

If it's not working correctly, try installing git-scripts manually:
`yarn add git-scripts --save`

use `yarn surge` to do the same, but it will run `gulp build` first and deploy production version of build (mostly about minified assets)


## Other
You can also use [npm scripts](https://docs.npmjs.com/misc/scripts):

* `yarn start` - same as `gulp default`.
* `yarn build` - same as `gulp build`.
* `yarn surge` - deploy `./dist` folder to **surge** (used for previews). Request deploy rights from owner (surge --add friend@email.co)
