import React, { useEffect, useState } from "react";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="navlogo"
        src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
        alt="logo"
      />
      <img
        className="navAvatar"
        src="https://www.seekpng.com/png/detail/514-5147412_default-avatar-icon.png"
        alt="avatar"
      />
    </div>
  );
}

export default Nav;
