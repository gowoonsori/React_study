import React, {useEffect} from 'react';
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import Router from 'next/router';
import axios from "axios";
import {END} from "redux-saga";

import AppLayout from "../componets/AppLayout";
import FollowList from "../componets/FollowList";
import NicknameEditForm from "../componets/NicknameEditForm";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST} from "../reducers/user";
import wrapper from "../store/configureStore";

const Profile = () => {
  const dispatch = useDispatch();
  const {me} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type : LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type : LOAD_FOLLOWINGS_REQUEST,
    });
  },[]);

  useEffect(() => {
    if (!(me && me.id)) {
      alert("로그인이 필요합니다.");
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8"/>
        <title>내 프로필 | Node bird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm/>
        <FollowList header="팔로잉 목록" data={me.Followings}/>
        <FollowList header="팔로워 목록" data={me.Followers}/>
      </AppLayout>
    </>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  //서버에서 실행될때는 쿠키 공유 문제가 생김
  if(context.req && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type : LOAD_MY_INFO_REQUEST,
  })
  context.store.dispatch(END);                // request후 sucess가 될때까지 기다린후
  await context.store.sagaTask.toPromise();   // 렌더링 끝내기
});

export default Profile;