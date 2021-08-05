import styled from "styled-components"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import { Mic } from "@material-ui/icons";
import { AttachFile, InsertEmoticon, MoreVert } from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from '../components/Message'
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react'

export default function ChatScreen({chat,messages}) {
    const [user]=useAuthState(auth);
    const router=useRouter();
    const[input,setInput]=useState('');
    const[messagesSnapShot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));
    const recepEm=getRecipientEmail(chat.users,user)
    const [recipientSnapshot]=useCollection(
        db.collection('users').where('email','==',recepEm)
    )
    const showMessages=()=>{
        if(messagesSnapShot){
            return messagesSnapShot.docs.map((msg)=>(<Message key={msg.id} user={msg.data().user} message={{...msg.data(),timestamp:msg.data().timestamp?.toDate().getTime() }} />))
        }else{
            
            return JSON.parse(messages).map((msg)=>(<Message key={msg.id} user={msg.user} message={msg} />))
         }
    }
    const endOfMsg=useRef(null)
    const scrollToBtm=()=>{
        endOfMsg.current.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    }
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true})
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL
        })
        setInput('');
        scrollToBtm();
    }
    const recipient=recipientSnapshot?.docs?.[0]?.data();
 
    const cutEmail=(e='')=>{
        let indexOfAt=e.indexOf('@');
        if(indexOfAt>-1){
           let name=e.slice(0,indexOfAt),
           provider=e.slice(indexOfAt);
           if(name.length>6){
              name= e.slice(0,6);
           }
            return `${name}..${provider}`;
        }
        return e;
    }

    return (
        <Container>
            <Header>
                {recipient?(<Avatar src={recipient.photoURL}/>):(<Avatar className="capitalize" >{recepEm[0]}</Avatar>)}
                 <HeaderInfo>
                    <h3>{cutEmail(recepEm)}</h3>
                    {recipientSnapshot?(<p>last seen : {recipient?.lastSeen?.toDate()? (<TimeAgo datetime={recipient?.lastSeen?.toDate()} />):"UnAvailable" } </p>):(<p>Loading last seen...</p>)} 
                </HeaderInfo> 
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMsg}/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticon/>
                <Input value={input} onChange={(e)=>{setInput(e.target.value)}} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send</button>
                <Mic/>
            </InputContainer>
        </Container>
    )
}
const Container=styled.div``;
const Header=styled.div`
position: sticky;
background-color: white;
z-index:100;
top:0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom:1px solid whitesmoke;
`;
const HeaderInfo=styled.div`
margin-left: 15px;
flex: 1;
>h3{
    margin-bottom: 3px;
}
>p{
    font-size: 14px;
    color: gray;
}
`;
 const MessageContainer=styled.div`
padding: 30px;
min-height: 90vh;
background-color: #e5ded8;
`;
const EndOfMessage=styled.div`
margin-bottom: 50px;
`;
const InputContainer=styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0px;
z-index:100;
background-color: white;
`;
const Input=styled.input`
outline: 0px;
border: none;
flex: 1;
border-radius: 10px;
 padding: 20px;
 background-color: whitesmoke;
 margin-left: 15px;
 margin-right: 15px;
 `;