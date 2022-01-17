# Firefox Send Clone

- This project was created in memory of the firefox send site and because I wanted to practice recreating all the functionality. This project was made using React using NEXT.js framework and the main feature is that we are using MongoDB, Express, Node and React. There's an MVC architecture, and a RESTful API.
- In the client side we can find Server Side Rendering, formik to have standard form validation rules, file conversions, and recent hooks.
- In the server side we are using Mongoose to connect to the database and create a schema, CORS, file storage.

Aditional features:
- We are using the JWT authentication to login and protect the routes.
- Password encryption using bcrypt.
- Most recent documentation of React, NEXT.js and Node.



You can see this project on https://firefox-send-clone.netlify.app

## Screenshots

![App Screenshot](https://d33wubrfki0l68.cloudfront.net/61e505728bfa8400089a3933/screenshot_2022-01-17-05-59-37-0000.png)


## Deployment
To deploy this project locally run on both projects Client and Server 

```bash
  npm install
```
First you need to create a database in Mongo (Local or using Atlas to keep it online) and Set your own .env file in server to connect with Mongodb and the Client.
- Server runs by default on 8080 port

```
  DB_URL=[YOUR_DB_STRING_CONECTION]
  JWT_SECRET=[YOUR_SECRET_KEY_TO_SIGN_THE_TOKEN]
  FRONTEND_URL=http://localhost:3000  <-It depends on the route where you host your client
```

Then in Client find the "next.config.js" file and set your server URL and client URL

```
  module.exports = {
  reactStrictMode: true,
  env: {
    backendURL: "http://localhost:8080", <-It depends on the route where you host your server
    frontendURL: "http://localhost:3000", <-It depends on the route where you host your client
  },
};
```

After this you shouldn't have any problems. So..

```bash
npm run dev
```


  
## Authors

- [Luis Angel Quiñones Guerrero](https://github.com/luisangelq)

  
## Feedback

If you have any feedback, please contact me at luisangelq3673@gmail.com
