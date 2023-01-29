// Functions
import { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

// Icons
import { BiSearchAlt2 } from "react-icons/bi";

// CSS
import S from "./InputText.module.css";

export const InputText = () => {
  const router = useRouter();

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const { searching } = Object.fromEntries(formData.entries());

    if (searching === "") {
      alert("Insira um nome válido");
    }
    if (searching) {
      router.push(`/procurando/${searching}?page=1`);
    }
    input.current!.value = "";
  };
  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <input
        ref={input}
        type="text"
        name="searching"
        placeholder="Buscar por um Filme ou Série..."
      />
      <button type="submit">
        <BiSearchAlt2 className={S.icon} />
      </button>
    </form>
  );
};
