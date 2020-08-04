const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const { Op } = require('sequelize');

const { User , Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

/*로그인하고난 후 내 정보 불러오기*/
router.get('/', async (req, res ,next) => {
  try {
    if( req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where : { id : req.user.id },
        //attributes 원하는 것만  가져오기 |속성:  exclude 제외하는 것
        attributes : {
          exclude : ['password']
        },
        include : [{
          model : Post,
        }, {
          model: User,
          as : 'Followings',
          attributes : ['id'],
        },{
          model: User,
          as : 'Followers',
          attributes : ['id'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else{
      res.status(200).json(null);
    }
    } catch(error){
    console.error(error);
    next(error);
  }
})

/*login passport 설정*/
router.post('/login', isNotLoggedIn ,( req, res , next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if(info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if(loginErr){
        console.error(loginErr);
       return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where : { id : req.user.id },
        //attributes 원하는 것만  가져오기 |속성:  exclude 제외하는 것
        attributes : {
          exclude : ['password']
        },
        include : [{
          model : Post,
          attributes : ['id'],
        }, {
          model: User,
          as : 'Followings',
          attributes : ['id'],
        },{
          model: User,
          as : 'Followers',
          attributes : ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req,res,next);
});

/*게시글 작성*/
router.post('/', isNotLoggedIn, async (req,res,next) => {
  try {
    const exUser = await User.findOne({
      where : {
        email : req.body.email,
      }
    });
    if(exUser){
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('OK');
  } catch( error){
    console.error(error);
    next(error);      //status 500
  }
});

/*로그아웃*/
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

/*닉네임 변경*/
router.patch('/nickname' ,isLoggedIn, async (req, res, next) => {
  try{
    await User.update({
      nickname : req.body.nickname,
    },{
      where : { id : req.user.id },
    });
    res.status(200).json( { nickname : req.body.nickname });
  }catch(error){
    console.error(error);
    next(error);
  }
});

/*팔로우*/
router.patch('/:userId/follow', isLoggedIn, async (req,res,next) => {
  try{
    const user = await User.findOne( { where : { id : req.params.userId}});
    if(!user){
      res.status(403).send('없는 사람을 팔로우하려고 합니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json( { UserId : parseInt( req.params.userId,10 )});
  }catch(error){
    console.error(error);
    next(error);
  }
});

/*언팔로우*/
router.delete('/:userId/follow', isLoggedIn, async (req,res,next) => {
  try{
    const user = await User.findOne( { where : { id : req.params.userId }});
    if(!user){
      res.status(403).send('없는 사람을 팔로우하려고 합니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json( { UserId : parseInt( req.params.userId,10 )});
  }catch(error){
    console.error(error);
    next(error);
  }
});

/*팔로우 목록 가져오기*/
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne( {where : {id : req.user.id}});
    if(!user){
      res.status(403).send('없는 사람을 찾으려고 합니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne( {where : {id : req.user.id}});
    if(!user){
      res.status(403).send('없는 사람을 찾으려고 합니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  }catch(error){
    console.error(error);
    next(error);
  }
});

/* 팔로워 제거 */
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne( {where : {id : req.params.userId}});
    if(!user){
      res.status(403).send('없는 사람을 차단하려고 합니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId : parseInt(req.params.userId, 10)});
  }catch(error){
    console.error(error);
    next(error);
  }
});


module.exports = router;