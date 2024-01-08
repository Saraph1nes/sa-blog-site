import {Analytics} from '@vercel/analytics/react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Go2Top from "@/components/Go2Top";
import DarkModeProvider from "@/components/DarkModeProvider";
import Router from "@/app/router";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <>
      <DarkModeProvider>
        <Navbar/>
        <Router />
        <Footer/>
        <Go2Top/>
      </DarkModeProvider>
      <Analytics/>
    </>
  )
}

export default App
