import React, {useEffect} from 'react';
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import Router from 'next/router';

import AppLayout from "../componets/AppLayout";
import FollowList from "../componets/FollowList";
import NicknameEditForm from "../componets/NicknameEditForm";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST} from "../reducers/user";

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

export default Profile;