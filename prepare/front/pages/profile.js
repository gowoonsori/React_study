import React from 'react';
import AppLayout from "../componets/AppLayout";
import Head from "next/head";
import FollowList from "../componets/FollowList";
import NicknameEditForm from "../componets/NicknameEditForm";

const Profile = () => {
  const followingList = [{nickname : 'gowoonsori'} , {nickname: 'hong'}, {nickname: 'cafe'}];
  const followerList = [{nickname : 'gowoonsori'} , {nickname: 'hong'}, {nickname: 'cafe'}];

    return (
      <>
          <Head>
              <meta charSet="utf-8"/>
              <title>내 프로필 | Node bird</title>
          </Head>
          <AppLayout>
            <NicknameEditForm />
            <FollowList header = "팔로잉 목록" data ={followingList}/>
            <FollowList header = "팔로워 목록" data ={followerList}/>
          </AppLayout>
      </>
    )
}

export default Profile;