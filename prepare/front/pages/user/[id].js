import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Card} from 'antd';
import {END} from 'redux-saga';
import Head from 'next/head';
import {useRouter} from 'next/router';
import axios from 'axios';

import wrapper from '../../store/configureStore';
import {LOAD_USER_POSTS_REQUEST} from '../../reducers/post';
import {LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST} from '../../reducers/user';

import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {id} = router.query;
  const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector((state) => state.post);
  const {userInfo, me} = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>
          {userInfo.nickname}
          님의 글
        </title>
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        <meta property="og:image" content="https://gowoonsori.site/favicon.ico" />
        <meta property="og:url" content={`https://gowoonsori.site/user/${id}`} />
      </Head>
      {userInfo && userInfo.id !== me?.id ? (
        <Card
          style={{marginBottom: 20}}
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
