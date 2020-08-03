const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

/*데이터 가져올 때 (include) 모든 정보 가져오기*/

router.get('/', async (req, res, next) => {
  try{
    const where = {};
    const posts = await Post.findAll({
      /*limit, offset 은 새로 게시글 생성,삭제시 꼬이기 때문에 실무에서 잘 사용 x
      last id 방식 사용
       */
      where,
      limit : 10,
      //offset : 10, // 10~20
      order : [['createdAt','DESC'],  [Comment, 'createdAt', 'DESC'],],
      include : [{
        model : User,
        attributes : ['id', 'nickname'],
      },{
        model : Image,
      },{
        model : Comment,
        include : [{
          model : User,
          attributes : ['id', 'nickname'],
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