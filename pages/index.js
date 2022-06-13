import Head from 'next/head'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import Sidebar from '../components/Sidebar.component'
import Center from '../components/Center.component'
import Player from '../components/Player.component'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>


      <main className='flex'>
        <Sidebar />
        <Center />
        {/* main Container */}
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}


//renders out page with our token on the server before fetching it 
export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
}