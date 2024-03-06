import { useState } from "react";
import { Image } from "../global/Image";
import Logo from "../../assets/logo.svg";

const AuthHeader = () => {
  const [navBarColor] = useState(false);
  return (
    <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-8">
      <nav
        className={`w-full md:h-20 h-19 sm:h-16 h-15 h-12 ${
          navBarColor ? "bg-white" : "bg-transparent"
        } lg:px-24 md:px-12 px-8 flex justify-between items-center`}
      >
        <Image
          as="a"
          href="/auth/login"
          className="h-8"
          image={Logo}
          alt="Logo"
        />
      </nav>
    </header>
  );
};

export default AuthHeader;
