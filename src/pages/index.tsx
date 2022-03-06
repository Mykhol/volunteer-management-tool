import * as React from 'react';
import type { NextPage } from 'next';
import FullPageContainer from "@/common/component/container/FullPageContainer";
import Link from 'next/link'
import styled from "@emotion/styled";
import BaseForm from "@/common/component/form/BaseForm";
import MemberForm from "@/module/member/component/MemberForm";

const Test = styled.div`

  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.palette.secondary.main};

`

const Home: NextPage = () => {
    return (
            <MemberForm>

            </MemberForm>
    )
}

export default Home;
