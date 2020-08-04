const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

/*데이터 가져올 때 (include) 모든 정보 가져오기*/

/*모든 게시글 불러오기 ( 10개 씩 )*/
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
      order : [['createdAt','DESC']],
      include : [{
        model : User,                 //게시글 작성자
        attributes : ['id', 'nickname'],
      },{
        model : Image,
      },{
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
      }],
    });
    res.status(200).json(posts);
  }catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;