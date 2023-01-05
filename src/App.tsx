import { Outlet } from "react-router-dom";
import { NavBar } from "./components";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;
