import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/index.jsx";
import Go2Top from "@/components/Go2Top/index.jsx";
import Footer from "@/components/Footer/index.jsx";

const BlogLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Go2Top />
      <Footer />
    </>
  );
};

export default BlogLayout;
