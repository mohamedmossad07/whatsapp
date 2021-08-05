import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      {/* head of document */}
      <Head>
        <title>WhatsApp 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*end  head of document */}
    
      {/*Start Sidebar section */}
        <Sidebar/>
      {/* end Sidebar section */}
    </div>
  )
}
