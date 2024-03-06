/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Logo from "../../../assets/logo.svg";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import ProfileMenu from "./ProfileMenu";
import NavList from "./NavList";
import { Image } from "../../global/Image";

export function NavbarDefault() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar
      className="mx-auto mb-10 max-w-screen-xl p-2 lg:pl-6"
      placeholder={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <a href="/user/dashboard" className="mr-5">
          <Image className="w-24" image={Logo} alt="Logo" />
        </a>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
          placeholder={undefined}
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
