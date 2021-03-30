const app = require('./src/app');
const pool = require('./src/pool');

pool.connect({
  host:'localhost',
  port:5432,
  name:'DATABASE_NAME',
  user:'USERNAME',
  password:'PASSWORD'
}).then(res=>{
    app().listen(5000,()=>{
      console.log('listen on port 5000')
    });
}).catch(err=>console.log(err));
