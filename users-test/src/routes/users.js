const express = require('express');
const User = require('../repo/user-repo')
const router = express.Router();

router.get('/users',async(req,res)=>{
  const users = await User.find();
  res.send(users)

});
router.get('/users/:id',async(req,res)=>{
  const {id} = req.params;
  let user;
  try{
       user = await User.findById(id);
    }catch(err){
      console.log(err)
    }
    if(user) return res.send(user);
    return res.send('no such user')

});

router.post('/users',async(req,res)=>{
  const {username,bio} = req.body;
  if(!username || !bio) return res.send('invalid inputs');
  const user = await User.insert(username,bio);
  return user
});
router.put('/users/:id',async(req,res)=>{
  const {id} = req.params;
  const {username,bio} = req.body;
  let user;
  try{
       user = await User.update(username,bio,id);
    }catch(err){
      console.log(err)
    }
    if(user) return res.send(user);
    return res.send('error')
});
router.delete('/users/:id',async(req,res)=>{
    const {id} = req.params;
  const user = await User.delete(id);
  if(user) return res.send(user);
  return res.send('error')
});

module.exports = router;
