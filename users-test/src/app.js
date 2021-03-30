const express = require('express');
const userRouters = require('./routes/users')
module.exports=()=>{
  const app = express();
  app.use(express.json());
  app.use(userRouters)
  return app;
}
