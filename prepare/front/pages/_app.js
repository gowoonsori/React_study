import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css'
import Head from 'next/head';

import wrapper from '../store/configureStore.js'

const NodeBird = ({Component}) => {
    return (
        <>
            <Head>
                <meta charSet = "utf-8" />
                <meta name="description" content={'gowoonsori'} />
                <meta property="og:title" content={'gowoonsori'}/>
                <meta property="og:description" content={'gowoonsori'} />
                <meta property="og:image" content='https://gowoonsori.site/favicon.ico'/>
                <meta property="og:url" content={`https://gowoonsori.site`} />
                <title>Node bird</title>
            </Head>
            <Component />
        </>
    )
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(NodeBird);