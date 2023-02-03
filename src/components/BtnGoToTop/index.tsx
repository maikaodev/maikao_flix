// Functions - Native
import { useEffect, useState } from "react";

// CSS
import S from "./BtnGoToTop.module.css";

export const BtnGoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <>
      {showTopBtn && (
        <button
          className={S.float_button}
          onClick={() => {
            goToTop();
          }}
        >
          ⬆
        </button>
      )}
    </>
  );
};
