// Functions - Native
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./style.css";

// Icons
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

// TS
import { FormEvent, useRef } from "react";

export const NavBar = () => {
  //
  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { name_movie } = Object.fromEntries(formData.entries());

    if (name_movie === "") {
      alert("Insira um nome válido");
    }
    if (name_movie) {
      navigate(`/${name_movie}`);
    }
    input.current!.value = "";
  };
  return (
    <nav id="topo">
      <Link to="/?page=1">
        <h2>
          <BiCameraMovie />
          MaikaoFlix
        </h2>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          ref={input}
          type="text"
          name="name_movie"
          placeholder="Buscar..."
        />
        <button type="submit">
          <BiSearchAlt2 id="icon" />
        </button>
      </form>
    </nav>
  );
};
