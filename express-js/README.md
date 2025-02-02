```
npm install --save express

node expressServer.js

curl localhost:3333

curl -X POST http://localhost:3333/login/Jason

curl http://localhost:3333/Jason

curl http://localhost:3333/loginDetails
```

```
node expressAppLevelMiddleware.js
curl localhost:3333/home
curl http://localhost:3333/home?password=pwd123
```

```
npm install --save express-session jsonwebtoken
node expressWithAuthentication.js
curl localhost:5000/auth/get_message
```