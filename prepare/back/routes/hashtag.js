const express = require('express');
const router = express.Router();
const { Post, Hashtag, Image, Comment,User }= require("../models");

const {Op} = require("sequelize");


/*사용자의 게시글 불러오기*/
router.get('/:hashtag', async (req, res, next) => {
  try{
    const where = {} ;
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
        model : Hashtag,
        where : { name : decodeURIComponent(req.params.hashtag) },
      }, {
        model : User,
        attributes : ['id','nickname'],
      },{
          model : Image,
      },
        {
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