import {all, fork, takeLatest, put , delay} from 'redux-saga/effects';
import axios from 'axios';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS
} from '../reducers/user';
/*로그인*/

function logInAPI(data){
  return axios.post('/api/login',data);
}
function* logIn(action) {
  try{
    //const result = yield call(logInAPI,action.data)
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch(err){
    yield put({
      type : LOG_IN_FAILURE,
      error : err.response.data,
    })
  }
}

/*로그아웃*/
function logOutAPI(){
  return axios.post('/api/logout');
}
function* logOut() {
  try{
    //const result = yield call(logOutAPI)
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch(err){
    yield put({
      type : LOG_OUT_FAILURE,
      error : err.response.data,
    })
  }
}
/*회원가입*/
function signUpAPI(){
  return axios.post('/api/signup');
}
function* signUp() {
  try{
    //const result = yield call(logOutAPI)
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch(err){
    yield put({
      type : SIGN_UP_FAILURE,
      error : err.response.data,
    })
  }
}
/*팔로우*/
function followAPI(data){
  return axios.post('/api/follow',data);
}
function* follow(action) {
  try{
    //const result = yield call(logInAPI,action.data)
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch(err){
    yield put({
      type : FOLLOW_FAILURE,
      error : err.response.data,
    })
  }
}

/*언팔로우*/
function unFollowAPI(data){
  return axios.post('/api/unFollow',data);
}
function* unFollow(action) {
  try{
    //const result = yield call(logInAPI,action.data)
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch(err){
    yield put({
      type : UNFOLLOW_FAILURE,
      error : err.response.data,
    })
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST,follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST,unFollow);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST,signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogOut),
    fork(watchSignUp),
  ])
}