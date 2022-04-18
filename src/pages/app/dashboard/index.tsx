import {NextPage} from "next";
import Navigation from "@module/navigation/component/Navigation";
import styled from "@emotion/styled";

const PageContainer = styled.div`

    width: 100vw;
  min-height: 100vh;
    
`

const DashboardPage : NextPage = () => {

    return (
        <PageContainer>
            <Navigation />
        </PageContainer>
    )

}

export default DashboardPage