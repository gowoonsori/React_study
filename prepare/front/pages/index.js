import React, {useEffect} from 'react';
import AppLayout from "../componets/AppLayout";
import {useSelector, useDispatch} from "react-redux";

import PostForm from "../componets/PostForm";
import PostCard from "../componets/PostCard";
import {LOAD_POST_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";

const Home = () =>{
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts , hasMorePosts , loadPostLoading, } = useSelector((state) => state.post);

    useEffect(()=>{
        dispatch({
            type : LOAD_MY_INFO_REQUEST,
        })
        dispatch({
            type : LOAD_POST_REQUEST,
        })
    },[]);

    /*무한 스크롤 시 스크롤 너비 사용자 정의*/
    useEffect(() => {
        function onscroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostLoading) {
                    dispatch({
                        type: LOAD_POST_REQUEST,
                    });
                }
            }
        }
        window.addEventListener('scroll', onscroll);
        return () => {
            window.removeEventListener('scroll', onscroll);
        };
    },[hasMorePosts,loadPostLoading]);

    return (
        <AppLayout>
          {me &&<PostForm />}
          {mainPosts.map((post) =>  <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
}

export default Home;