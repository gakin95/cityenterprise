import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/global.css';
import 'react-calendar/dist/Calendar.css';
import theme from '../src/theme';
import { Provider } from "react-redux";
import { store } from '../src/store/store'

export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>cityEvents</title>
        <link rel="icon" href="https://i2.wp.com/cityevents.ng/wp-content/uploads/2017/04/cityeventsng-logo.jpg?fit=200%2C200&ssl=1" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcxtb7nAs568Mfk3lBqE8_3FuvGzAf3MY&libraries=places"></script>
      </Head>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
