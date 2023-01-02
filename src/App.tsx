import { Link, Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <nav>
        <li>
          <Link to="/">Home</Link>
          <Link to="/movie/1">Movie</Link>
          <Link to="/search">Search</Link>
        </li>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
