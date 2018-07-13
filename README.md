# Notify

This repo contains the code for the **_Front End_** of the Notify - student absence notification app. 
This is an app that will be used by a primary school to keep track of all the 
students that will be absent. It has two user views, a parent view and an admin view.
In the parent view, a user will be able to add children to their account and have the ability to send a notification
that their child will not be coming to school either today or tomorrow. 

On the admin view, the admin user will be able to view all absences sent by parents and this view is real time. So, this means that as soon as a parent clicks a button to submit the absence notification, the admin will see this in real time. 
There are a host of technologies used to make this app work like a charm! These technologies
are as follows:

## Front End 
- [React.js](https://github.com/facebook/react)
- [Redux.js](https://github.com/reduxjs/redux) 
- [Redux-Saga.js](https://github.com/redux-saga/redux-saga) 
- [React-Router-Dom.js](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) 
- [Socket.io-client.js](https://github.com/socketio/socket.io-client) 
- [Bootstrap](https://getbootstrap.com/) 
- [Formik](https://github.com/jaredpalmer/formik) (forms)
- [Yup](https://github.com/jquense/yup) (form field validation)
- [Axios](https://github.com/axios/axios)
- [CoreUI](https://github.com/coreui/coreui-free-bootstrap-admin-template) (Bootstrap admin template) 
- Tests [Jest](https://github.com/facebook/jest)

## Back End
- [Node.js](https://github.com/nodejs/node) 
- [Express.js](https://github.com/expressjs/express) 
- [MongoDB](https://github.com/mongodb/mongo)
- Mongoose 
- [Passport.js](https://github.com/jaredhanson/passport) 
- [Socket.io](https://github.com/socketio/socket.io) 
- [Bcrypt-node.js](https://github.com/kelektiv/node.bcrypt.js/) 
- [Json-web-token.js](https://github.com/auth0/node-jsonwebtoken) 
- [Body-parser.js](https://github.com/expressjs/body-parser) 
- [Cors.js](https://github.com/expressjs/cors) 

## How to use the app

You can take the app for a test drive by going to https://notify-2018.herokuapp.com/ you need to sign up for an 
account. Once you register, you will be assigned as a parent user. To make notifications, you will
need to add at least one child to your account. 

To see the app in action as the admin view, use the following admin demo account to log in as an admin: 

- Email: almas@gmail.com
- password: almas

The app works best when used with the Google Chrome browser. In order to view the real-time absence updates, you will need to be logged in as a parent user in one window
and then open a second browser window (Incognito) then log in as the admin user. 

Once logged-in, click on the Absentees link on the Dashboard. Here you will see a list of all the students that will be absent on a given date.
With both windows in view, add a new absence notification and you will then see the absence pop up on the admin view instantly.

