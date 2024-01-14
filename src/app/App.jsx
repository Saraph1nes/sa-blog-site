import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Go2Top from "@/components/Go2Top";
import DarkModeProvider from "@/components/DarkModeProvider";
import Router from "@/app/router";
// import Loading from "@/components/Loading/index.jsx";
// import {useLocation} from "react-router-dom";
// import {useLayoutEffect, useState} from "react";

function App() {
  // const location = useLocation()
  //
  // const [show, setShow] = useState(false)
  //
  // useLayoutEffect(() => {
  //   setShow(true)
  //   const timer = setTimeout(() => {
  //     setShow(false)
  //   }, 2000)
  //
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [location]);

  return (
    <>
      <DarkModeProvider>
        <Navbar/>
        <Router />
        <Footer/>
        <Go2Top/>
        {/*<Loading show={show}/>*/}
      </DarkModeProvider>
    </>
  )
}

export default App
