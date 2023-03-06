import type { AppProps } from 'next/app'
import { store } from '../Redux/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
