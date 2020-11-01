import React, {useCallback, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';

import {Form, Input, Button, Modal} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {loginRequestAction} from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
/*use Memo 이용 방법
const style = useMemo(() => ({marginTop : 10}), []);
*/
const FormWrapper = styled(Form)`
  padding: 10px;
`;
const loginFormWrapper = styled.div`
  width: 400px;
  heigth: 400px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const {loginLoading} = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({email, password}));
  }, [email, password]);

  return (
    <loginFormWrapper>
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
          <Button type="primary" htmlType="submit" loading={loginLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </loginFormWrapper>
  );
};

export default Login;
