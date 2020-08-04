import {all,call, fork,takeLatest, put , throttle} from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS, UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS
} from '../reducers/post';
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";



function loadPostAPI(data){
  return axios.get(`/posts`, data);
}
function* loadPost(action) {
  try{
    const result = yield call(loadPostAPI, action.data)
    yield put({
      type: LOAD_POST_SUCCESS,
      data : result.data,
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
  return axios.post('/post', data);
}
function* addPost(action) {
  try{
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data : result.data,
    });
    yield put({
      type : ADD_POST_TO_ME,
      data : result.data.id,
    })
  } catch(err){
    console.log(err);
    yield put({
      type : ADD_POST_FAILURE,
      data : err.response.data,
    })
  }
}


/*게시글 삭제*/
function removePostAPI(data){
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
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

/*이미지 업로드*/

function uploadImagesAPI(data){
  return axios.post('/post/images', data );
}
function* uploadImages(action) {
  try{
    const result = yield call(uploadImagesAPI, action.data)
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data : result.data,
    });
  } catch(err){
    console.log(err);
    yield put({
      type : UPLOAD_IMAGES_FAILURE,
      data : err.response.data,
    })
  }
}

/*댓글 추가*/

function addCommentAPI(data){
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try{
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch(err){
    console.log(err);
    yield put({
      type : ADD_COMMENT_FAILURE,
      data : err.response.data,
    })
  }
}

/*좋아요*/

function likePostAPI(data){
  return axios.patch(`/post/${data}/like`);
}
function* likePost(action) {
  try{
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch(err){
    console.log(err);
    yield put({
      type : LIKE_POST_FAILURE,
      data : err.response.data,
    })
  }
}

/*좋아요 취소*/

function unLikePostAPI(data){
  return axios.delete(`/post/${data}/like`);  //patch도 가능
}
function* unLikePost(action) {
  try{
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch(err){
    console.log(err);
    yield put({
      type : UNLIKE_POST_FAILURE,
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
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchRemovePost),
    fork(watchUploadImages),
  ])
}