import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import {
  RecoilRoot
} from 'recoil'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (

    //enables us to persist our sate
    <SessionProvider session={session}>
      <RecoilRoot>

        <Component {...pageProps} />

      </RecoilRoot>

    </SessionProvider >

  )
}

export default MyApp
