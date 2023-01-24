import { Outlet } from "react-router-dom";
import { BtnGoToTop, Footer, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <BtnGoToTop />
      <Footer />
    </>
  );
}

export default App;
