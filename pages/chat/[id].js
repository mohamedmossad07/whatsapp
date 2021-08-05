import styled from "styled-components"
import Head from 'next/head'
 import ChatScreen from '../../components/ChatScreen'
import { auth, db } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import getRecipientEmail from "../../utils/getRecipientEmail"
import SidebarCom from "../../components/Sidebar"
import { ChevronLeft, ChevronRight } from "@material-ui/icons"
import { useState } from "react"
export default function UserId({chat,messages}) {
    const[user] =useAuthState(auth);
    const [expanded,setExpanded]=useState(false)
    // const []
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users,user)}</title>
            </Head>
            <SidebarContainer expanded={expanded}>
                <ToggleSidebar onClick={()=>setExpanded(!expanded)}>
                    {expanded?<ChevronLeft/>:<ChevronRight/>}
                </ToggleSidebar>
                <Sidebar/>
            </SidebarContainer>
            <ChatContainer onClick={()=>setExpanded(false)}>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}
export const getServerSideProps = async ({query}) => {
    const ref=db.collection('chats').doc(query.id);
    const msgs=await ref.collection('messages').orderBy('timestamp','asc').get();
    const messages=msgs.docs.map((doc)=>({id:doc.id,...doc.data()})).map((ms)=>({...ms,timestamp:ms.timestamp.toDate().getTime()}))

    const chatRs=await ref.get();
    const chat={
        id:chatRs.id,
        ...chatRs.data()
    }


    return {
        props:{
            messages:JSON.stringify(messages),
            chat
        }
    }
}
const SidebarContainer=styled.div`
 position: relative;
  margin-left: ${({expanded})=>expanded?'0px':'-350px'};
  transition: all .2s;
`;
const ToggleSidebar=styled.div`
padding: 10px;
position: absolute;
top: 50%;
right: -30px;
cursor: pointer;
background-color: white;
border-radius: 10px;
  :hover{
    background-color: whitesmoke;
}

`;
const Sidebar=styled(SidebarCom)``;
const Container=styled.div`
display: flex;
`;
const ChatContainer=styled.div`
flex: 1;
overflow: scroll;
height: 100vh;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style:none;
scrollbar-width: none;
`;