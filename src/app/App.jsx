import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Go2Top from "@/components/Go2Top";
import DarkModeProvider from "@/components/DarkModeProvider";
import Router from "@/app/router";

function App() {
  return (
    <>
      <DarkModeProvider>
        <Navbar/>
        <Router />
        <Footer/>
        <Go2Top/>
      </DarkModeProvider>
    </>
  )
}

export default App
