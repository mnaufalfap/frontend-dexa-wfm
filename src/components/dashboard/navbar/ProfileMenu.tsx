import UserLogo from "../../../assets/img/user.png";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { createElement, useState } from "react";
import { profileMenuItems } from "./ProfileMenuItem";

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
          placeholder={undefined}
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="profile"
            className="border border-gray-900 p-0.5"
            placeholder={undefined}
            src={UserLogo}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1" placeholder={undefined}>
        {profileMenuItems.map(({ label, icon, url }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
              placeholder={undefined}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="a"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                placeholder={undefined}
                href={url}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
