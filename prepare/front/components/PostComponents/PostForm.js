import React, {useCallback, useRef, useEffect} from 'react';
import {Form, Input, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';

import {UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST} from '../../reducers/post';
import useInput from '../../hooks/useInput';
import {backUrl} from '../../config/config';

const PostForm = () => {
  const {imagePaths, addPostDone} = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  /*파일 업로드*/
  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData(); // FormData == 멀티파트 방식으로 처리
    [].forEach.call(e.target.files, (f) => {
      //e.target.files ==> 배열 x, 유사배열
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Form style={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="무슨 일이 있으셨나요?" />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{float: 'right'}} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{display: 'inline-block'}}>
            {/*<img src ={v.replace(/\/thumb\//, '/original/')} style = {{width : "100px"}} alt = {v} />  s3 upload*/}
            <img src={`${backUrl}/${v}`} style={{width: '100px'}} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
