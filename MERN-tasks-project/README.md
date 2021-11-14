# MERN Project

- This project was made using React and the main feature is that we are using MongoDB, Express, Node and React. This is the most complete project I have made where you can find a MVC architecture, and a RESTful API.
- In the client side we are using Context Provider and Consumer to pass data from the parent to the child.
- In the server side we are using Mongoose to connect to the database and create a schema.

Aditional features:
- We are using the JWT authentication to login and protect the routes.
- Password encryption using bcrypt.
- Most recent documentation of React and Node.



You can't see this project on https://mern-project-2.netlify.app/

## Screenshots

![App Screenshot](https://d33wubrfki0l68.cloudfront.net/61906e89ec13b71ac7316971/screenshot_2021-11-14-02-03-54-0000.png)


## Deployment
To deploy this project run

```bash
  npm install
  npm start
```
First you need to create a database in Mongo and
Set your own .env file in server to connect with Mongodb

```bash
  DB_MONGO=[YOUR_DB_STRING_CONECTION]
  SECRET_KEY=[YOUR_SECRET_KEY_TO_SIGN_THE_TOKEN]
```

Set your own .env file in client to connect with server

```bash
  REACT_APP_BACKEND_URL=http://localhost:4000  <-It depends on the route where you host your server
```


  
## Authors

- [Luis Angel Quiñones Guerrero](https://github.com/luisangelq)

  
## Feedback

If you have any feedback, please contact me at luisangelq3673@gmail.com
