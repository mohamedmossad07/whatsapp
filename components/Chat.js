import { Avatar } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components"
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
 import { useState } from "react";
import Circle from "better-react-spinkit/dist/Circle";
export default function Chat({users,id}) {
    const router=useRouter()
     const [user]=useAuthState(auth);
     const recipientEmail=getRecipientEmail(users,user)
     const [recipientSnapshot]=useCollection(db.collection('users').where('email','==',recipientEmail))
     const recipient=recipientSnapshot?.docs?.[0]?.data()
    const [loading,setLoading]=useState(false);
     const enterChat=async ()=>{
         setLoading(true);
            await  router.push(`/chat/${id}`)
         setLoading(false);

     }
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
        // <Link href={`/chat/${id}`}  passHref >
        <Container onClick={enterChat}>{/*onClick={enterChat}*/}
            {recipient?(<UserAvatar src={recipient.photoURL} />):(<UserAvatar className="capitalize">{recipientEmail[0]}</UserAvatar>)}
            <p>{cutEmail(recipientEmail)}</p>
            {loading? 
            <Loader>
               <span style={{display:'block'}}>
                <Circle color="#2CBC28"  size={50}/>
               </span>
            </Loader>
            :''}
        </Container>
        // </Link>
    )
}

const Container=styled.div`
position: relative;
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
:hover{
    background-color: #e9eaeb;
}
`;
const UserAvatar=styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;
const Loader=styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
right: 0;
`