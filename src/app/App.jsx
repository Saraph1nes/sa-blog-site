import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Go2Top from "@/components/Go2Top";
import DarkModeProvider from "@/components/DarkModeProvider";
import Router from "@/app/router";
import UserInfoProvider from "@/components/UserInfoProvider/index.jsx";
import {useEffect} from "react";
import {baseURL} from "../../config.js";

function App() {

  useEffect(() => {
    const handleUnload = () => {
      const pageViewCount = sessionStorage.getItem('pageViewCount');
      const form = new FormData();
      form.append('count', pageViewCount)
      const sendBeaconRes = navigator.sendBeacon(`${baseURL}/open/sablogs/updatePV`, form);
      console.log(`已上报本次的PV ===> ${pageViewCount}`, sendBeaconRes)
      sessionStorage.removeItem('pageViewCount');
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  // const fetchUpdatePV = async (count) => {
  //   return await service.get('/open/sablogs/updatePV',{
  //     data: {
  //       count
  //     }
  //   });
  // };

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
