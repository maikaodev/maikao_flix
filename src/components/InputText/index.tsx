// Functions
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { BiSearchAlt2 } from "react-icons/bi";

// CSS
import "./style.css";

export const InputText = () => {
  const navigate = useNavigate();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { searching } = Object.fromEntries(formData.entries());

    if (searching === "") {
      alert("Insira um nome válido");
    }
    if (searching) {
      navigate(`/procurando/${searching}`);
    }
    input.current!.value = "";
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="searching"
        placeholder="Buscar por um Filme ou Série..."
      />
      <button type="submit">
        <BiSearchAlt2 id="icon" />
      </button>
    </form>
  );
};
