const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();
const passportConfig = require('./passport');

db.sequelize.sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

/* get 가져오기
   post 생성하기
   put 전체 수정
   delete 제거
   patch 부분 수정
   options 찔러보기
   head 헤더만 가져오기
*/
passportConfig();

/*front 의 정보(data)를 req 에 붙여줌 */
app.use(cors({
  origin : '*',
}));
app.use(express.json());                              //json 형태의 데이터 처리
app.use(express.urlencoded({ extended: true}));  //form submit시에 데이터 처리

/*  req | res
  헤더 ==> 상태, 용량, 시간,쿠키
  바디 ==> 데이터
 */
app.get('/', (req,res) =>{
  res.send('hello express');
});
app.get('/api', (req,res) =>{
  res.send('hello api');
});
app.get('/posts', (req,res) =>{
  res.json([
    {id : 1, content: 'hello1'},
    {id : 2, content: 'hello2'},
    {id : 3, content: 'hello3'},
  ]);
});

app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});