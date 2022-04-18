import {useAuth} from "@module/auth/component/AuthProvider";
import styled from "@emotion/styled";
import {useRouter} from "next/router";

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
  
  button {
    
    height: 50px;
    width: 200px;
    
    background-color: ${props => props.theme.palette.error.main};
    color: ${props => props.theme.palette.primary.main};
    
    border: none;
    border-radius: 15px;
    
    cursor: pointer;
    
    transition: all 0.5s ease;
    font-weight: bold;
    font-size: 1.3rem;
    
    
    &:hover {
      opacity: 0.5;
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
            <button onClick={() => firebaseClient?.signInWithGoogle(query.redirect as string)}>Sign in</button>
            <p>* Please select your PYF Google Account</p>
        </AuthPageContainer>
    )

}

export default AuthPage