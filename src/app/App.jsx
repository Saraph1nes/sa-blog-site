import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Go2Top from "@/components/Go2Top";
import DarkModeProvider from "@/components/DarkModeProvider";
import Router from "@/app/router";
import UserInfoProvider from "@/components/UserInfoProvider/index.jsx";

function App() {

  return (
    <DarkModeProvider>
      <UserInfoProvider>
        <Navbar/>
        <Router/>
        <Footer/>
        <Go2Top/>
      </UserInfoProvider>
    </DarkModeProvider>
  )
}

export default App
