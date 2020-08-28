# React_Study

## 리액트를 이용하여 트위터 만들기 
## 사이트 주소 : [gowoonsori.site](gowoonsori.site) 

### :books: 사용 스택 : 
- react
- next.js
- redux / redux saga
- ant-design / styled-components / slick
- node
- express
- MySql

#### Start
- 2020.07.12 : LoginForm 만들기 ( 8% 진행 )
- 2020.07.14 : 더미데이터로 로그인 진행하기 (로그인 정보 : proptypes 이용) ( 16% 진행 )
- 2020.07.15 : redux 이용하여 로그인 / 게시글 올리기 + 이미지 추가 버튼(폴더 활성화) (24% 진행)
- 2020.07.19 : 댓글 보기 / slick 이용하여 사진 확대 / slide 기능 구현 (28% 진행)
- 2020.07.22 : (정규표현식을 이용)게시글 해시 태그 링크 만들기/ (redux-thunk) redux-saga 이해, 이용하여 게시글,댓글 작성(삭제) 구현 ( 38% 진행 ) 
- 2020.07.29 : immer 이용하여 불변성 관리 / faker이용하여 더미데이터 만들기 / 인피니트 스크롤링 구현 / 팔로우,언팔로우 버튼 구현 ( 44% 진행 )
- 2020.07.30 : express, mysql, sequelize설치 / sequelize 모델만들고 관계 설정 / nodemon 이용 ( 50% 진행 )
- 2020.07.31 : bcrypt, passport(local), cors 문제 해결하여 회원가입 구현하기 ( 54% 진행 )
- 2020.08.03 : session , cookie , credentials(쿠기 공유)를 cors 활용하여 로그인 유지 및 로그인 정보 매번 불러오기 구현 / 미들웨어(라우터)로 라우터 검사하기{로그인 했는지 안했는지} /
 dummy 데이터 삭제 후 게시글, 댓글 db에 insert, load 구현 /
  dotenv 이용하여 세션데이터 , db 비밀번호등 관리 /
  morgan 이용하여 error , post 등 요청 확인하기 ( 61% 진행 )
- 2020.08.04 : 팔로우 , 언팔로우 기능 / 게시글 제거 / 닉네임 변경 / multer, fs, path 이용한 이미지 업로드 / express.static(미들웨어)이용하여 이미지 파일 경로 생성 / (정규 표현식 이용)해시태그 등록 ( 68% 진행 )
- 2020.08.06 : 리트윗 기능 구현 / 게시글load시 querystring or lastId 방식 사용 / ssr 기능 구현(ssr시 쿠기 공유하기 / success후 ssr끝내기) , ssr 함수 비교 / dynamic routing (많은 페이지 생성을 막음) / css SSR / 해시태그,사용자 정보 검색 ( 77% 진행 )
- 2020.08.11 : swr사용하여 reducer이벤트 간소화하기 / 해시태그 검색 / dayjs사용 / next 빌드 / 커스텀 웹팩 , bundle-analyzer / aws배포 위해 ec2생성 / ubuntu에 node, mysql, pm2 설치하여 배포하기 / 도메인 연결하기 ( 92% 진행)
- 2020.08.28 : nginx 서버와 Let's Encript (free SSL Certification)을 이용하여 https 적용하기

#### 추가 해볼 기능 : 회원가입 조건 까다롭게 바꾸기, 카톡/구글등으로 로그인 (passport), 팔로워/ 리트윗 이름에 링크걸기 / 팔로잉목록 링크걸기 / 디자인 수정, 게시글 링크 만들어 공유하기, 댓글 삭제, image 서버에 저장하면서 리사이징
#### 버그 수정 : 리트윗 시 닉네임 변경됨 --> 클릭하면 링크는 제대로 감 ( 완료 )
##### [인프런 / React로 Node Bird SNS 만들기 : 조현영 ](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC#)
