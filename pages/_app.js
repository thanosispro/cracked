import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
// Add a react-top-loading bar matching our website theme on changing routes
// Use useEffect to start the loading bar on route change and stop it on route change 
// use an state progress for loading bar instead of loadingBar.start() and loadingBar.complete()
// use an animation for the loading bar

import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatBot from "@/components/ChatBot";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleRouteChange = () => {
      setProgress(10);
    };
    const handleRouteComplete = () => {
      setProgress(100);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router]);
  return (
    <div className="bg-[#020617] min-h-screen text-slate-300 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans antialiased">
      <LoadingBar color='#818cf8' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <ChatBot />
    </div>
  );
}
