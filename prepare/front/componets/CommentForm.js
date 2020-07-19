import React ,{useCallback} from 'react';
import useInput from '../hooks/useInput'
import {Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
/*Form 수작업하기 반복작업이기 때문에 폼 라이브러리 사용하면 편함*/

const CommentForm = ({post}) =>{
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput('');
  const onSubmitComment = useCallback(()=> {
    console.log(post.id,commentText);
  },[commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: 'relative', margin: 0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{position: 'absolute', right: 0, bottom: -40}} type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  );
};
CommentForm.prototype = {
  post : PropTypes.object.isRequired
}

export default CommentForm;