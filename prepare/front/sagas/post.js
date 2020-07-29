import {all, fork,takeLatest, put , delay, throttle} from 'redux-saga/effects';
import shortId from 'shortid';
import axios from 'axios';

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS
} from '../reducers/post';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";



function loadPostAPI(data){
  return axios.post('/api/loadPost', data);
}
function* loadPost() {
  try{
    //const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data : generateDummyPost(10),
    });
  } catch(err){
    yield put({
      type : LOAD_POST_FAILURE,
      data : err.response.data,
    })
  }
}

/*게시글 추가*/

function addPostAPI(data){
  return axios.post('/api/addPost', data);
}
function* addPost(action) {
  try{
    //const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data : {
        id,
        content : action.data,
      }
    });
    yield put({
      type : ADD_POST_TO_ME,
      data : id,
    })
  } catch(err){
    yield put({
      type : ADD_POST_FAILURE,
      data : err.response.data,
    })
  }
}
/*게시글 삭제*/
function removePostAPI(data){
  return axios.post('/api/removePost', data);
}
function* removePost(action) {
  try {
    //const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    })
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    })
  }
}


/*댓글 추가*/

function addCommentAPI(data){
  return axios.post('/api/addComment', data);
}
function* addComment(action) {
  try{
    //const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch(err){
    yield put({
      type : ADD_COMMENT_FAILURE,
      data : err.response.data,
    })
  }
}
function* watchLoadPost() {
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadPost),
    fork(watchRemovePost),
  ])
}