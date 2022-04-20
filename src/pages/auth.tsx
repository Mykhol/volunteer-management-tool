import {useAuth} from "@module/auth/component/AuthProvider";
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import styled from "styled-components";

interface AuthPageProps {
    redirectUrl: string
}

const AuthPageContainer = styled.div`

  min-height: 100vh;
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  
  #button {
    width: 300px;
    height: 60px;
    
    font-size: 1.5rem;
    font-weight: bolder;
    
    &:hover {
      opacity: 0.8;
    }
    
  }
  
  p {
    margin-top: 20px;
  }
  

`

const AuthPage = () => {

    const {user, firebaseClient} = useAuth()
    const { query } = useRouter()

    return (
        <AuthPageContainer>
            <Button id={"button"} variant={"contained"} onClick={() => firebaseClient?.signInWithGoogle(query.redirect as string)}>Sign in</Button>
            <p>* Please select your PYF Google Account</p>
        </AuthPageContainer>
    )

}

export default AuthPage