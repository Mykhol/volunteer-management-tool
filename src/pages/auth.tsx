import {useAuth} from "@/module/auth/component/AuthProvider";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import styled from "@emotion/styled";

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

const AuthPage = ({redirectUrl} : AuthPageProps) => {

    const {user, firebaseClient} = useAuth()


    return (
        <AuthPageContainer>
            <button onClick={() => firebaseClient?.signInWithGoogle(redirectUrl)}>Sign in</button>
            <p>* Please select your PYF Google Account</p>
        </AuthPageContainer>
    )

}

export const getServerSideProps: GetServerSideProps = async (context : GetServerSidePropsContext) => {

    if (context.query.redirect != null) {
        return {
            props: {
                redirectUrl: context.query.redirect
            }
        }
    } else {
        return {
            props: {
                redirectUrl: "/app/dashboard"
            }
        }
    }


}

export default AuthPage