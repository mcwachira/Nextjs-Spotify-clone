import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (

    //enables us to persist our sate
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider >


  )
}

export default MyApp
