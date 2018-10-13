//====================================================================


// use the node.js REPL (Read Evaluate Print Loop) by just entering
// $ node
// this will give you a command prompt, basically node's CONSOLE you can play in

// global. and TAB TAB
// will give you a list of all global properties

// same with:
// Number.
// Object.
// String.
// etc

// _
// typed after some code will print the result of the last operation


//====================================================================


// REPL .help
// .break  ends input on a multi-line input (same as ctrl-C)
// .clear  resets REPL context to empty object and clears any current multi-line input
// .editor  enables editor more, to write multiline JS code; ctrl-D to run the code
// .help  shows all . commands
// .exit  exits the REPL, back to CLI shell (same as ctrl-C x2)
// .help  prints this help message
// .load  load JS from a file into this REPL session
// .save  save everything entered in this REPL session to a file (specify filename)


// the REPL understands when you are writing multi-line code,
// so if you hit return when writing a function, etc. it will give you
// ...
// to indicate okay, next line, write more code
// when you hit the end of the function, like with })
// THEN it will exit back to the REPL command propt


//====================================================================


// PROCESS.ARGV
// process.argv[0] is the full path of the node command ("node")
// process.argv[1] is the full path of the file being executed ("app.js")

// arguments [2],[3], etc., can be standalone, or have key=value
// node app.js bonzo
// or
// node app.js name=bonzo

// iterating over all args in .argv:
// process.argv.forEach((val, index) => {
// console.log(`${index}: ${val}`)
// })

// and eliminating the first two node and file args:
// create a new array with .slice that excludes 0 and 1 indexes
// NOTE this makes your first input arg[0] (rather than calling process.argv[2])
// const args = process.argv.slice(2)

// MINIMIST library to help deal with arguments
// use MINIMIST to parse name=bonzo, bring it in on the fly:
// const args = require('minimist')(process.argv.slice(2))
// args['name'] // flavio


//====================================================================


// NODE CONSOLE
// basically just like the browser console

// pretty formatting in console:
// console.log('My %s has %d years', 'cat', 2)
// My cat has 2 years

// %s  format a variable as a string
// %d or %i  format a variable as an integer
// %f  format a variable as a floating point number
// %O  used to print an object representation

// console.clear()
// clears the console

// console.count()
// counts the number of times a string has been printed:

// > const x = 1
// > const y = 2
// > const z = 3

// > console.count(
// ...   'The value of x is ' + x + ' and has been checked .. how many times?'
// ... )
// The value of x is 1 and has been checked .. how many times?: 1

// > console.count(
// ...   'The value of x is ' + x + ' and has been checked .. how many times?'
// ... )
// The value of x is 1 and has been checked .. how many times?: 2

// > console.count(
// ...   'The value of y is ' + y + ' and has been checked .. how many times?'
// ... )
// The value of y is 2 and has been checked .. how many times?: 1

// OR

// > const oranges = ['orange', 'orange']
// > const apples = ['just one apple']

// > oranges.forEach(fruit => {
// ...   console.count(fruit)
// ... })
// orange: 1
// orange: 2

// > apples.forEach(fruit => {
// ...   console.count(fruit)
// ... })
// just one apple: 1


//====================================================================


// PRINTING THE STACK TRACE
// prints out the what actually happens when a function gets called

// SO USING THIS:
// const function2 = () => console.trace()
// const function1 = () => function2()
// function1()

// WILL PRINT THIS:
// Trace
//     at function2 (repl:1:33)
//     at function1 (repl:1:25)
//     at repl:1:1
//     at ContextifyScript.Script.runInThisContext (vm.js:44:33)
//     at REPLServer.defaultEval (repl.js:239:29)
//     at bound (domain.js:301:14)
//     at REPLServer.runBound [as eval] (domain.js:314:12)
//     at REPLServer.onLine (repl.js:440:10)
//     at emitOne (events.js:120:20)
//     at REPLServer.emit (events.js:210:7)


//====================================================================


// CHANGING COLOR OF PRINTOUT TEXT

// low level, manual way:
// console.log('\x1b[33m%s\x1b[0m', 'hi!')

// OR, use a library like CHALK
// const chalk = require('chalk')
// console.log(chalk.yellow('hi!'))
// console.log(chalk.green('hi!'))
// console.log(chalk.red('hi!'))
// console.log(chalk.blue('hi!'))


//====================================================================


// using PROGRESS to make a simple progress bar

// const ProgressBar = require('progress')
// const bar = new ProgressBar(':bar', { total: 10 })
// const timer = setInterval(() => {
//   bar.tick()
//   if (bar.complete) {
//     clearInterval(timer)
//   }
// }, 100)


//====================================================================


// ACCEPTING INPUT FROM THE CLI

// node has the built-in READLINE module:

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
//   readline.question(`What's your name?`, (name) => {
//     console.log(`Hi ${name}!`)
//     readline.close()
//   })


// OR, THE MUCH MORE POWERFUL inquirer:

// const inquirer = require('inquirer')
// var questions = [{
//   type: 'input',
//   name: 'name',
//   message: "What's your name?",
// }]
// inquirer.prompt(questions).then(answers => {
//   console.log(`Hi ${answers['name']}!`)
// })


//====================================================================


// EXPOSE FUNCTIONALITY OF A NODE.JS FILE WITH EXPORTS

// getting the functionality of a built-in or installed module:
// const library = require('library')

// getting the functionality of one of your own files:
// const file = require('./file')

// AND MAKING SPECIFIC DATA FROM YOUR FILE AVAILABLE UPON require:

// module.exports:
// exposes the object pointed to (the object exported out of the file)
// const car = {
//     brand: 'Ford',
//     model: 'Fiesta'
// }
// module.exports = car;

// and import it with:
// const car = require('./car');


// exports.
// exposes the properties of the object pointed to (the filename itself)
// OR, YOU CAN ADD IT AS A PROPERTY OF .exports
// IN ORDER TO EXPORT MULTIPLE OBJECTS
// exports.car = car;
// exports.scooter = scooter;
// exports.motorcycle = motorcycle;

// OR YOU CAN DO IT DIRECTLY, THIS WAY:
// exports.car = {
//     brand: 'Ford',
//     model: 'Fiesta'
// }

// with exports.car, require the filename:
// const filename = require('./filename');
// and then call properties on it:
// filename.car


//====================================================================


// NPM Node Package Manager
// Jan 2017: over 350,000 packages, largest code repository on Earth

// npm init
// creates the packages.json file

// npm install
// installs everything listed in the package.json file

// npm install package-name
// gets and installs the package-name module

// npm install package-name@1.1.1
// gets and installs a specific version of package-name module

// npm install package-name --save
// adds the module as a direct dependency to your project

// npm install package-name --save-dev
// adds the module as a development-only direct dependency to your project

// npm update
// checks all packages for any updates, and updates everything

// npm update package-name
// just looks for updates for the package-name module


//====================================================================


// NPM TASK-RUNNING
// npm can use {"scripts":{}} to define the name and functions of a command to run:
// $ npm taskname

// LIKE:
// {
//     "scripts": {
//         "start-dev": "node lib/server-development",
//         "start": "node lib/server-production"
//     }
// }

// OR, RUNNING WEBPACK:
// {
//     "scripts": {
//         "watch": "webpack --watch --progress --colors --config webpack.conf.js",
//         "dev": "webpack --progress --colors --config webpack.conf.js",
//         "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
//     }
// }

// SO THEN FOR WEBPACK YOU CAN JUST TYPE:
// $ npm watch
// $ npm dev
// $ npm prod


//====================================================================


// NPM installation location: global (-g) and local

// usually you want to intall locally for dev on a specific project
// npm install package-name

// but sometimes you want to install helper modules that you use for everything
// npm install -g package-name

// find the ROOT directory where npm is installing all your global packages:
// npm root -g

// returns something like:
// /usr/local/lib/node_modules

// note this location will differ if you are using NVM (Node Version Manager)
// to switch between different versions of Node.js

// then just require these as noted above, or as instructed by the module, like:
// const _ = require('lodash');
// which is the way to refer to the LODASH module


//====================================================================


// NPX
// EXECUTEABLE MODULES
// installs the executable file in:
// node_modules/.bin/
// .bin being a hidden directory
// and it will put its main self dir and dependencies in:
// node_modules

// example: COWSAY executable module
// long way:
// ./node_modules/.bin/cowsay
// short NPX way:
// npx cowsay


//====================================================================


// PACKAGE.JSON

// name: sets the application/package name
// version: indicates the current version
// description: is a brief description of the app/package
// main: set the entry point for the application
// private: if set to true prevents the app/package to be accidentally published on npm
// scripts: defines a set of node scripts you can run
// dependencies: sets a list of npm packages installed as dependencies
// devDependencies: sets a list of npm packages installed as development dependencies
// engines: sets which versions of Node this package/app works on
// browserslist: is used to tell which browsers (and their versions) you want to support

// VERSION NUMBER SPECIAL CHARACTERS:

// ~: if you write ~0.13.0, you want to only update patch releases: 0.13.1 is ok, but 0.14.0 is not.
// ^: if you write ^0.13.0, you want to update patch and minor releases: 0.13.1, 0.14.0and so on.
// *: if you write *, that means you accept all updates, including major version upgrades.
// >: you accept any version higher than the one you specify
// >=: you accept any version equal to or higher than the one you specify
// <=: you accept any version equal or lower to the one you specify
// <: you accept any version lower to the one you specify
// There are other rules, too:

// no symbol: you accept only that specific version you specify
// latest: you want to use the latest version available
// and you can combine most of the above in ranges, like this: 1.0.0 || >=1.1.0 <1.2.0, to either use 1.0.0 or one release from 1.1.0 up, but lower than 1.2.0.

//====================================================================

// PACKAGE-LOCK.JSON
// keeps track of the EXACT version of EVERY dependency in your project
// so that when a new $npm install is run, npm will install THOSE VERSIONS
// instead of just getting the latest-greatest versions which might break your project

// npm list
// will show you a tree of every dependency and it's installed version

// npm list -g
// will show you a tree of all your globally installed packages

// npm install package-name@1.1.1
// gets and installs a specific version of package-name module

// npm install -g package-name@1.1.1
// gets and installs a specific version of package-name module globally

// npm view package-name versions
// gives you a list of current and all previous versions of the package

// npm outdated
// npm outdated -g
// shows you (local and global) packages that have new versions available

// npm update
// will only update minor sub-version releases
// because major version updates frequently will break your program
// npm saves you the headache

// npm install -g npm-check-updates
// DANGER!! THIS IS THE NUCLEAR OPTION, THAT WILL UPDATE EVERYTHING
// INCLUDING MAJOR VERSIONS
// THIS IS SAFER WITH THE -g GLOBAL INSTALLS, SINCE THEY ARE YOUR WORKING UTILITIES
// MORE DANGEROUS FOR SPECIFIC APPS YOU ARE BUILDING; MAKE A COPY AND TEST UPDATES FIRST

// then run this to upgrade version hints in package.json file
// to dependencies and devDependencies:
// ncu -u

// then you can run the update:
// npm update

// or if you just downloaded the project without dependencies
// and want to install all the shiny new versions first, instead run:
// npm install


//====================================================================

// SEMANTIC VERSIONING
// convention used in all programming languages:

// The Semantic Versioning concept is simple: all versions have 3 digits: x.y.z.

// the first digit is the major version
// the second digit is the minor version
// the third digit is the patch version

// When you make a new release, you don’t just up a number as you please, but you have rules:

// you up the major version when you make incompatible API changes
// you up the minor version when you add functionality in a backward-compatible manner
// you up the patch version when you make backward-compatible bug fixes


//====================================================================


// VERSIONING NOTATION RULES
// Let’s see those rules in detail:

// ^: if you write ^0.13.0 when running npm update it can update to patch and minor releases: 0.13.1, 0.14.0 and so on.
// ~: if you write ~0.13.0, when running npm update it can update to patch releases: 0.13.1 is ok, but 0.14.0 is not.
// >: you accept any version higher than the one you specify
// >=: you accept any version equal to or higher than the one you specify
// <=: you accept any version equal or lower to the one you specify
// <: you accept any version lower to the one you specify
// =: you accept that exact version
// -: you accept a range of versions. Example: 2.1.0 - 2.6.2
// ||: you combine sets. Example: < 2.1 || > 2.6
// You can combine some of those notations, for example use 1.0.0 || >=1.1.0 <1.2.0 to either use 1.0.0 or one release from 1.1.0 up, but lower than 1.2.0.

// There are other rules, too:

// no symbol: you accept only that specific version you specify (1.2.1)
// latest: you want to use the latest version available


//====================================================================


// INSTALL AND UNINSTALL, LOCALLY OR GLOBALLY

// npm uninstall package-name
// uninstalls package from local project node_modules

// npm uninstall -g package-name
// uninstalls a globally installed package from your ROOT node package directory

// npm uninstall package-name -S
// npm uninstall package-name --save
// uninstalls locally AND removes reference from package.json

// npm uninstall package-name -D
// npm uninstall package-name --save-dev
// uninstalls a devDependency locally AND removes reference from package.json

// ONLY PACKAGES THAT PROVIDE CLI COMMANDS SHOULD BE INSTALLED GLOBALLY, LIKE:
// npm
// create-react-app
// vue-cli
// grunt-cli
// mocha
// react-native-cli
// gatsby-cli
// forever
// nodemon


// npm list --depth 0
// shows a list of your top-level (no dependencies) installed local packages

// npm list -g --depth 0
// shows a list of your top-level (no dependencies) installed global packages


//====================================================================


// DEV DEPENDENCIES

// npm install package-name
// installs package as a normal top level local dependency

// npm install package-name -D
// npm install package-name --save-dev
// installs package as a local devDependency

// npm install
// will install all dependencies AND devDependencies
// automatically assumes this is a developement installation

// npm install --production
// WILL NOT INSTALL devDependencies, only regular dependencies


//====================================================================


// NPX
// Node Package Runner
// runs code built with Node.js and published through NPM

// devs used to publish executable commands as global packages
// pain in the butt, because can't install different versions of same command

// $ npx commandname
// automatically finds correct reference inside a projects node_modules
// allowing local installation of executeable CLI commands
// don't have to know exact path
// don't have to install globally

// npx also allows you to run commands you don't have either locally or globally
// like COWSAY:
// npx cowsay "Hello"
// will go to NPM to get COWSAY, download it, run the code, then wipe the download


// useful instances of this would be things like:

// running the vue CLI tool to create new applications and run them: 
// npx vue create my-vue-app

// creating a new React app using create-react-app: 
// npx create-react-app my-react-app

// run different code with different versions of Node, without using NVM, etc.
// npx node@6 -v #v6.14.3
// npx node@8 -v #v8.11.3

// run online snippets of code, like from a GitHub gist:
// npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
// returns: "yay gist"
// USE THIS CAREFULLY!!



//====================================================================


// THE EVENT LOOP

