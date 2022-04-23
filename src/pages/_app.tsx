import * as React from 'react';
import Head from 'next/head';
import {ThemeProvider} from '@mui/material/styles';
import {Global} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@common/component/util/style/theme';
import {AuthProvider} from "@module/auth/component/AuthProvider";
import FirebaseClientService from "@module/firestore/service/FirebaseClientService";
import {GlobalStyles} from "@common/component/util/style/GlobalStyle";
import {SWRConfig} from 'swr'

const firebaseClient = new FirebaseClientService()

export default function MyApp(props: { Component: any; pageProps: any; }) {
    const { Component, pageProps } = props;
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <title>PYF App</title>
            </Head>
            <SWRConfig value={{
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}>
                <Global styles={GlobalStyles} />
                <AuthProvider firebaseClient={firebaseClient}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </AuthProvider>
            </SWRConfig>
        </>
    );
}
