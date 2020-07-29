import produce from 'immer';

export const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  changeNickNameLoading: false,
  changeNickNameDone: false,
  changeNickNameError: null,
  me: null,
  signUpdate: {},
  loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_TO_ME';

const dummyUser = (data) => ({
  ...data,
  nickname: '의성',
  id: 1,
  Posts: [{id: 1}],
  Followings: [{nickname: "부기초"}, {nickname: "홍"}, {nickname: "의성"}],
  Followers: [{nickname: "부기초"}, {nickname: "홍"}, {nickname: "의성"}],
});

/*
export const loginAction = (data)=> {
  return (dispatch, getState) =>{
    const state = getState();
    dispatch(loginRequestAction());
    axios.post('/api/login')
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      })
  }
}
*/
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;

    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;

    case LOG_IN_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;

    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;

    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;

    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;

    case CHANGE_NICKNAME_REQUEST:
      draft.changeNickNameLoading = true;
      draft.changeNickNameDone = false;
      draft.changeNickNameError = null;
      break;

    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNickNameLoading = false;
      draft.changeNickNameDone = true;
      break;

    case CHANGE_NICKNAME_FAILURE:
      draft.changeNickNameLoading = false;
      draft.changeNickNameError = action.error;
      break;

    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;

    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;

    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;

    case ADD_POST_TO_ME :
      draft.me.Posts.unshift({id: action.data});
      break;

    case REMOVE_POST_OF_ME :
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;

    case FOLLOW_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;

    case FOLLOW_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me.Followings.push({id : action.data});
      break;

    case FOLLOW_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.loginLoading = true;
      draft.loginError = null;
      draft.loginDone = false;
      break;

    case UNFOLLOW_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
      break;

    case UNFOLLOW_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;