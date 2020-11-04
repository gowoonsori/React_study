import React, {useCallback, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';

import {Form, Input, Button} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {loginRequestAction} from '../reducers/user';

const LoginFormWrapper = styled.div`
  width: 500px;
  heigth: 500px;
  text-align: center;
  border: 1px solid;
  display: table;
  padding: 20px;
  margin-top: 150px;
  margin-left: auto;
  margin-right: auto;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
  text-align: left;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
/*use Memo 이용 방법
const style = useMemo(() => ({marginTop : 10}), []);
*/

const Login = () => {
  const dispatch = useDispatch();
  const {logInLoading, logInDone} = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({email, password}));
  }, [email, password]);

  useEffect(() => {
    if (logInDone) {
      Router.replace('/');
    }
  }, [logInDone]);

  return (
    <LoginFormWrapper>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </LoginFormWrapper>
  );
};

export default Login;
