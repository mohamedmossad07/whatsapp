import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth } from "../firebase";

export default function Message({user,message}) {
    const [userLog] =useAuthState(auth);
    const Type=user==userLog.email?Sender:Reciever;
    return (
        <Container>
            <Type>{message.message}
            <TimeStamp>
                {message.timestamp?moment(message.timestamp).format('LT'):'...'}
            </TimeStamp>
            </Type>
        </Container>
    )
}

const Container=styled.div``;
const MessageElm=styled.p`
width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom:26px;
position: relative;
text-align:right;
`
const Sender=styled(MessageElm)`
margin-left: auto;
background-color: #dcf8c6;
`
const Reciever=styled(MessageElm)`
text-align:left;
background-color: whitesmoke;
`
const TimeStamp=styled.span`
color: gray;
padding: 10px;
font-size: 9px;
position: absolute;
bottom:0px;
text-align:right;
right:0;
`