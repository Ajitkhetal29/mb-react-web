import React, { useEffect, useState } from "react";

const BackTotopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`fixed bottom-5 end-5 ${
        showButton ? "" : "hidden"
      } fixed bottom-6 cursor-pointer  right-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-black focus:outline-none focus:ring-4 focus:ring-orange-400 transition`}
      onClick={backToTop}
    >
      <span class="[&>svg]:w-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </span>
    </button>
  );
};

export default BackTotopBtn;
