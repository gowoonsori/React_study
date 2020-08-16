const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User , Post, Image, Comment } = require('../models');
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
});

/*팔로우 목록 가져오기*/
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne( {where : {id : req.user.id}});
    if(!user){
      res.status(403).send('없는 사람을 찾으려고 합니다.');
    }
    const followers = await user.getFollowers({
      limit : parseInt(req.query.limit, 10),
    });
    res.status(200).json(followers);
  }catch(error){
    console.error(error);
    next(error);
  }
});
/*팔로잉한사람*/
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try{
    const user = await User.findOne( {where : {id : req.user.id}});
    if(!user){
      res.status(403).send('없는 사람을 찾으려고 합니다.');
    }
    const followings = await user.getFollowings({
      limit : parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  }catch(error){
    console.error(error);
    next(error);
  }
});

/*로그인하고난 후  다른 사람 user 정보 불러오기*/
router.get('/:userId', async (req, res ,next) => {
  try {
      const fullUserWithoutPassword = await User.findOne({
        where : { id : req.params.userId },
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
     if(fullUserWithoutPassword) {
       /*개인정보 침해 예방*/
       const data = fullUserWithoutPassword.toJSON();
       data.Posts = data.Posts.length;
       data.Followers = data.Followers.length;
       data.Followings = data.Followings.length;
       res.status(200).json(data);
     } else {
       res.status(404).json('존재하지 않는 사용자입니다.');
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

/*사용자의 게시글 불러오기*/
router.get('/:userId/posts', async (req, res, next) => {
  try{
    const where = { UserId : req.params.userId };
    if(parseInt(req.query.lastId,10)){   //초기 로딩이 아닐때
      where.id = { [Op.lt] : parseInt(req.query.lastId, 10)};
    }
    const posts = await Post.findAll({
      /*limit, offset 은 새로 게시글 생성,삭제시 꼬이기 때문에 실무에서 잘 사용 x
      last id 방식 사용 */
      where,
      limit : 10,
      //offset : 10, // 10~20
      order : [['createdAt','DESC']],
      include : [{
        model : User,                 //게시글 작성자
        attributes : ['id', 'nickname'],
      },{
        model : Image,
      }, {
          model : Comment,
          include : [{
            model : User,                 //댓글 작성자
            attributes : ['id', 'nickname'],
            order : [['createdAt','DESC']],
          }]
        }, {
          model : User,                 //좋아요 한사람
          as : 'Likers',
          attributes : ['id'],
        },{
          model : Post,
          as : 'Retweet',
          include : [{
            model : User,
            attributes : ['id', 'nickname'],
          },{
            model : Image,
          }]
        }],
    });
    res.status(200).json(posts);
  }catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;