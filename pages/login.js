import styled from "styled-components"
import Head from 'next/head'
import { auth, provider } from '../firebase';
import { Button } from "@material-ui/core";
export default function login() {
    const signIn=()=>{
         auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
                <Head>
                    <title>Login</title>
                </Head>
                <LoginContainer>
                    <Logo src="/whatsapp.png"/>
                    <Button variant="outlined" onClick={signIn}>
                        Sign in with google
                    </Button>
                </LoginContainer>
        </Container>
    )
}

const Container=styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;
const LoginContainer=styled.div`
display: flex;
padding: 100px;
align-items: center;
background-color: white;
flex-direction: column;
 border-radius:5px;
  box-shadow:0px 4px 14px -3px rgba(0,0,0,0.7); 
`;
const Logo=styled.img`
height: 200px;
width: 200px;
margin-bottom: 50px;
`;