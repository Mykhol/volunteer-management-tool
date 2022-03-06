import * as React from 'react';
import type { NextPage } from 'next';
import FullPageContainer from "@/common/component/container/FullPageContainer";
import Link from 'next/link'
import styled from "@emotion/styled";

const Test = styled.div`

  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.palette.secondary.main};

`

const Home: NextPage = () => {
    return (
        <FullPageContainer>
            <Test />
            <Link href={"/auth"}><h2>Log in to get started</h2></Link>
            <p>* Please use your PYF Google Account</p>
        </FullPageContainer>
    )
}

export default Home;
