import React from 'react';
import AppLayout from "./componets/AppLayout";
import Head from "next/head";

const Signup = () => {
    return (
      <>
          <Head>
              <meta charSet="utf-8"/>
              <title>회원 가입</title>
          </Head>
          <AppLayout>회원가입 페이지</AppLayout>
      </>
    )
};

export default Signup;