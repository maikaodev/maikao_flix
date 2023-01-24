import { useEffect, useState } from "react";

import "./style.css";

export const BtnGoToTop = ({ onClick }: { onClick?: () => void }) => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  });

  return (
    <>
      {showTopBtn && (
        <button
          id="float_button"
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
