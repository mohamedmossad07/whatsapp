import Image from 'next/image'
import {Circle} from 'better-react-spinkit'
export default function Loading() {
    return (
        <center style={{display:'grid',placeItems:'center',height:'100vh'}}>
            <div>
                <Image src="/whatsapp.png" alt="loading" height={200} width={200} style={{marginBottom:10}}/>
                <Circle color="#2CBC28"  size={60}/>
            </div>            
        </center>
    )
}
