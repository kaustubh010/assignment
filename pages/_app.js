import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)

  return <>
    <LoadingBar height={3} color='#f11946' progress={progress}/><Navbar /><Component setProgress={setProgress} {...pageProps} /> <Footer />
  </>
}
