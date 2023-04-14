import Layout from '@next-nasa/components/Layout'
import '@next-nasa/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

// Creamos una instancia de la fuente:
const roboto = Roboto({
  weight: ['100','400','700', '900'],
  subsets: ['latin']
})

console.log(roboto);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
