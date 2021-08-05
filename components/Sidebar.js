import styled from "styled-components"
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import * as EmailValidator from 'email-validator'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import UserChat from '../components/Chat'
export default function Sidebar() {

    const [user] =useAuthState(auth);
    const chatsRef=db.collection('chats').where('users','array-contains',user.email);
    const [chatsSnapShots]=useCollection(chatsRef)

    // start create new chat
    const createNewChat=()=>{
        const email=prompt('Please enter email of user you wish to chat with')

        // chk f  user not entered email
        if(!email)
            return null;
        // chk f email valid
        if(EmailValidator.validate(email) && !chatAlreadyExists(email)  && email!=user.email ){
            console.log(chatAlreadyExists(email) ,'check already')
            db.collection('chats').add({
                users:[user.email,email]
            })
        }
    }

    // start chat already exists
    const chatAlreadyExists=(rEmail)=>
    !!chatsSnapShots?.docs.find(chat=>chat.data().users.find(user=>user==rEmail)?.length>0)
     
     return (
        <Container>
            <SideBarHeader>
                <UserAvatar src={user.photoURL} onClick={()=>{auth.signOut()}} /> 
            </SideBarHeader>
            <SearchContainer>
                <Search/>
                <SearchInput placeholder="Search in chats"/>
            </SearchContainer>
            <SideBarButton onClick={createNewChat}>
                Start a new chat
            </SideBarButton>
            {/* chats list */}
            {
            chatsSnapShots?.docs.map(chat=>{
                return <UserChat key={chat.id} id={chat.id}  users={chat.data().users} />
            })
            }
        </Container>
    )
}
const SideBarButton=styled(Button)`
&&&{
border-bottom: 1px solid whitesmoke;
border-top: 1px solid whitesmoke;
}
 width: 100%;
`;

const SearchInput=styled.input`
outline-width: 0px;
border: none;
flex: 1;
`;
const Container=styled.div`
flex:  .45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 350px;
max-width: 350px;
overflow-y: scroll;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style:none;
scrollbar-width: none;
`;
const SideBarHeader=styled.div`
display: flex;
position: sticky;
z-index:1;
justify-content: space-between;
align-items: center;
background: white;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
`;
const UserAvatar=styled(Avatar)`
cursor: pointer;
:hover{
    opacity: 0.8;
}
`;
const IconsContainer=styled.div``;
const SearchContainer=styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;