import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Test, Global} from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@/common/component/util/style/theme';
import createEmotionCache from '@/common/component/util/style/createEmotionCache';
import {AuthProvider} from "@/module/auth/component/AuthProvider";
import FirebaseClientService from "../module/firestore/FirebaseClientService";
import {GlobalStyles} from "@/common/component/util/style/GlobalStyle";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const firebaseClient = new FirebaseClientService()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Global styles={GlobalStyles} />
            <AuthProvider firebaseClient={firebaseClient}>
                <Test theme={theme}>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </Test>
            </AuthProvider>
        </CacheProvider>
    );
}
