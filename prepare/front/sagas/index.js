/*제너레이터 ( function 뒤에 *)
*   => 중단점이 있는 함수 (yield 이용하여 중단)
*  */
/*
  put == dispatch 역할
  call == 동기 함수 호출
  fork == 비동기 함수 호출
  takeEvery == while(true){ take }
  takeLatest == 실수로 여러번 클릭시 마지막 이벤트만 실행  <-> takeLeading == 첫번째 이벤트만
  throttle == 시간 설정하여 해당 시간동안 한번만 실행
* */
import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;   //쿠키 공유하기

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}