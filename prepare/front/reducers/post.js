export const initialState = {
  mainPosts :[{
    id : 1,
    User :{
      id :1,
      nickname : '제로초',
    },
    content : '첫 번째 게시글 #해시태그 #익스프레스',
    Images : [{
      src : "C:\\Users\\gowoo\\OneDrive\\Desktop\\1.jpg"
      }, {
      src: "C:\\Users\\gowoo\\OneDrive\\Desktop\\2.png"
      }, {
      src: "C:\\Users\\gowoo\\OneDrive\\Desktop\\3.png"
    }],
    Comments : [{
      User : {
        nickname : "gowoo",
      },
      content : "얼른 사고 싶어요"
    }, {
      User: {
        nickname: "som",
      },
      content: "보고 싶어요"
    }]
  }],
  imagePaths :[],
  postAdded : false,
}

const ADD_POST = 'ADD_POST';

export const addPost ={
  type: ADD_POST,
}

const dummyPost = {
  id : 2,
  User :{
    id :1,
    nickname : '제로초',
  },
  content : "더미 데이터입니다.",
  Images : [],
  Comments : []
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }
    default:
      return state;
  }
}
export default reducer;