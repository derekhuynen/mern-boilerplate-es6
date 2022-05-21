# Title
mern-boilerplate-es6

## Description
A basic boilerplate full-stack application. Using the mern Stack.

M - MongoDB
E - Express
R - React
N - Nodejs

More Information on the MERN Stack - (https://www.mongodb.com/mern-stack)


## How to Install

1. Install Server dependencies
    `npm install`

2.Install Client dependencies
    `cd client`
    `npm install`


### Server Configuration

In the `./.env` File 

1. Change the Connection to a MongoDB Database
        - Right now CONNECTION_STRING="mongodb://localhost:27017/Website"
        - "mongodb://localhost:27017" is the server address 
        - "Website" is the cluster name 
   
        - You can download MongoDB Compass for easy set-up
        - (https://www.mongodb.com/try/download/compass)

2. Set the Port for the Server
    -By default the SERVER_PORT is set to 3001

### Client Configuration

In the `./client/.env` 

1.Set the Port for Client
   -By default PORT is set to 3000

2.Set the SERVER_PORT 
   -By default SERVER_PORT is set 3001



### How to Run the Application

1. Start the Server
   `npm start`

2.Start the Client
   `cd client`
   `npm start`




### To Build your App

Run `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
