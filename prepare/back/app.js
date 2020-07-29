const http = require('http');

//요청에 뭔지 에 대한 정보 req
//응답에 대한 정보 res
const server = http.createServer((req,res) => {
  console.log(req.url, req.method);
  res.end("hello node");
});
server.listen(3060, ()=>{
  console.log("실행중");
});