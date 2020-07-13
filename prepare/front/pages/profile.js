import React from 'react';
import AppLayout from "./componets/AppLayout";
import Head from "next/head";

const Profile = () => {
    return (
      <>
          <Head>
              <meta charSet="utf-8"/>
              <title>내 프로필 | Node bird</title>
          </Head>
          <AppLayout> 내 프로필</AppLayout>
      </>
    )
}

export default Profile;