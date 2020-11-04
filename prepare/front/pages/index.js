import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {END} from 'redux-saga';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostComponents/PostForm';
import PostCard from '../components/PostComponents/PostCard';

import {LOAD_POSTS_REQUEST} from '../reducers/post';
import {LOAD_MY_INFO_REQUEST} from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const {me} = useSelector((state) => state.user);
  const {mainPosts, hasMorePosts, loadPostsLoading, retweetError} = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (!me) {
      Router.replace('/login');
    }
  }, [me]);

  /*무한 스크롤 시 스크롤 너비 사용자 정의*/
  useEffect(() => {
    function onscroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onscroll);
    return () => {
      window.removeEventListener('scroll', onscroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <div>
      {me && (
        <AppLayout>
          {me && <PostForm />}
          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </AppLayout>
      )}
    </div>
  );
};

//프론트 서버에서 실행  --> 쿠키와 세션을 가져오지못함
//데이터가 바뀔때
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  //서버에서 실행될때는 쿠키 공유 문제가 생김
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END); // request후 sucess가 될때까지 기다린후
  await context.store.sagaTask.toPromise(); // 렌더링 끝내기
});

export default Home;
