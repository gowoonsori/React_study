/* useCallback --> 함수를 캐싱
 *  useMemo   --> 값을 메모
 **/
import React, {useCallback, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {Form, Input, Button, Modal} from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import {loginRequestAction} from '../reducers/user';

/* div style 변경시 styled-components이용 방법
 * 이용 하는 이유 --> div style ={} 객체로 설정시 계속 리랜더링 하기 때문에 */
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
/*use Memo 이용 방법
const style = useMemo(() => ({marginTop : 10}), []);
*/
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({modalVisible, setModalVisible}) => {
  const dispatch = useDispatch();
  const {loginLoading} = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    setModalVisible(false);
    dispatch(loginRequestAction({email, password}));
  }, [email, password]);

  return (
    <Modal title="로그인" centered visible={modalVisible} closable={true} footer={null}>
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
    </Modal>
  );
};

LoginForm.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setodalVisible: PropTypes.func,
};
export default LoginForm;
