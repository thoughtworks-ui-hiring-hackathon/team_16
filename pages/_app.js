import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import store from '.././redux-state';
import {updateStoreWithCookies, fetchConfigurationAPI} from '.././globalActions';
import Layout from '.././components/layout';

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  return store;
};

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let trackingInfo = {};
    if (ctx.isServer) {
      await ctx.store.dispatch(updateStoreWithCookies(ctx.req.cookies));
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, trackingInfo);
    }
    return {'router': router};
  }

  render() {
    const { Component, pageProps, store, router } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component router={router}/>
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);