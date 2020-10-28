import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; //링크 컴포넌트
import {Menu, Input, Row, Col} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import Router from 'next/router';

import {logoutRequestAction} from '../reducers/user';
import useInput from '../hooks/useInput';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import {TwitterOutlined, UserOutlined, LoginOutlined, LogoutOutlined} from '@ant-design/icons';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({children}) => {
  const dispatch = useDispatch();
  const {me, logoutLoading, loginError} = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');
  const [modalVisible, setModalVisible] = useState(false); //고객 정보 추가창 상태 변수

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const onClickModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={4}>
          <Menu style={{textAlign: 'center'}}>
            <Menu.Item style={{margin: '30px'}}>
              <Link href="/">
                <TwitterOutlined style={{color: '#299aef', fontSize: '40px'}} />
              </Link>
            </Menu.Item>
            <Menu.Item style={{margin: '30px'}}>
              <Link href="/profile">
                <UserOutlined style={{fontSize: '40px'}} />
              </Link>
            </Menu.Item>
            <Menu.Item style={{margin: '30px'}}>
              {me ? (
                <LogoutOutlined onClick={onLogout} loading={logoutLoading} style={{fontSize: '40px'}} />
              ) : (
                <LoginOutlined onClick={onClickModal} style={{fontSize: '40px'}} />
              )}
            </Menu.Item>
          </Menu>
        </Col>
        <Col xs={24} md={14}>
          <Menu style={{marginBottom: '10px', borderBottom: '1px solid'}}>
            <Menu.Item>
              <Link href="/">
                <a style={{fontWeight: 'bold', fontSize: '1.6em'}}>홈</a>
              </Link>
            </Menu.Item>
          </Menu>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Menu>
            <Menu.Item>
              <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
            </Menu.Item>
          </Menu>
          {me ? <UserProfile /> : <LoginForm modalVisible={modalVisible} setModalVisible={setModalVisible} />}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
