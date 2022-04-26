import * as React from 'react';
import type {NextPage} from 'next';
import {useRouter} from "next/router";
import {useEffect} from "react";

const Home: NextPage = () => {

    const router = useRouter()

    useEffect(() => {
        router.push("/auth").then((r) => {})
    }, [])

    return (
        <div>
            <p>You will be redirected shortly...</p>
        </div>
    )
}

export default Home;
