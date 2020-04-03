# Golden-ink-api
The number one platform for writers. 

A [Sails v1](https://sailsjs.com) application

### Motivation
First off, I found out that many of the materials for learning sails such as blog posts, video courses, sample applications were very outdated 😢. So I built this to demonstrate how Sails.js can be used in creating real-world web APIs with many of the common modern features such as realtime updates, OAuth, etc as of 2020. This project hopes to help the curious have an idea of how Sails.js works, have a feel of some of the benefits and awesomeness of Sails, a reference to implement common features in your Sails application.

### Technologies
- Sails.js
- PostgreSQL
- RabbitMQ

### Features
- Google OAuth
- CRUD API
- Action2
- Permissions using policies
- File uploads to Cloudinary
- Task queues with RabbitMQ
- JWT authentication
- Waterline ORM
- Realtime client-server communication using Resourceful PubSub

### Set up
1. Clone this repository
2. `cd` into the repository
3. Run `npm install`
4. Create a `config/local.js` file to store credentials
5. Create a PostgreSQL database
6. Run `sails lift`⚡️🚢

### Contributing
Contributions are welcome. Been busy with other things lately, so there's a little unfinished part. You can add a new feature, find a bug, etc. Just do whatever you want with it, as long as you learn something.

### Author
George Benjamin


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sat Feb 15 2020 16:14:36 GMT+0100 (West Africa Standard Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

