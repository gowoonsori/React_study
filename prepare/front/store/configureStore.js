import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
//import thunkMiddleware from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../sagas';

/*redux 데이터 처리 라이브러리
* mobex나 context api를 사용하여 구현 할수 있다.
* 각 컴포넌트 별로 데이터 처리를 하면 코드 중복도 일어나고 부모 컴포넌틀를 만들어 중앙처리를 해야하는 번거로움이
* 있는 ㅔ 라이브러리를 사용하면 중앙처리 가능
* */

import reducer from '../reducers'

const loggerMiddleware = ({dispatch, getState }) => (next) => (action) =>{
  console.log(action);
  return next(action);
}

const configureStore = () =>{
  const sagaMiddleware = createSagaMiddleWare();
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : composeWithDevTools(applyMiddleware(sagaMiddleware,loggerMiddleware));
  const store = createStore(reducer,enhancer);     // "dispatch"명령어를 통하여 action이 수행될때 해당 action이 무엇을 수행할지 미리 선언해놓은 것
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {debug : process.env.NODE_ENV === 'development'});

export default wrapper;