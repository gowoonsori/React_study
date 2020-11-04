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
import {
  TwitterOutlined,
  UserOutlined,
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

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
        <Col xs={4} sm={4} md={3} lg={3} xl={6} flex="auto">
          <div style={{height: '100%'}}>
            <Menu style={{height: '100%', textAlign: 'center', fontSize: '20px'}}>
              <Menu.Item style={{marginTop: '30px'}}>
                <Link href="/">
                  <TwitterOutlined style={{color: '#299aef', fontSize: '1.4em'}} />
                </Link>
              </Menu.Item>
              <Menu.Item style={{marginTop: '30px'}}>
                <Link href="/">
                  <HomeOutlined style={{color: '#299aef', fontSize: '1.4em'}} />
                </Link>
              </Menu.Item>
              <Menu.Item style={{marginTop: '30px'}}>
                <Link href="/profile">
                  <UserOutlined style={{fontSize: '1.4em'}} />
                </Link>
              </Menu.Item>
              <Menu.Item style={{marginTop: '30px'}}>
                {me ? (
                  <LogoutOutlined onClick={onLogout} style={{fontSize: '1.4em'}} />
                ) : (
                  <Link href="/login">
                    <LoginOutlined style={{fontSize: '1.4em'}} />
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item style={{marginTop: '30px'}}>
                <Link href="/">
                  <EditOutlined style={{fontSize: '1.4em'}} />
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col xs={20} sm={20} md={13} lg={13} xl={10} flex="auto">
          <Menu style={{marginBottom: '10px', borderBottom: '2px solid'}}>
            <Menu.Item>
              <Link href="/">
                <a style={{fontWeight: 'bold', fontSize: '1.6em'}}>Home</a>
              </Link>
            </Menu.Item>
          </Menu>
          {children}
        </Col>
        <Col xs={0} sm={0} md={8} lg={8} xl={8} flex="auto">
          <Menu>
            <Menu.Item>
              <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
