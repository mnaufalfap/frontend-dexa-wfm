import { MenuItem, Typography } from "@material-tailwind/react";
import { navListItemsAdmin } from "./NavListItemAdmin";
import { createElement } from "react";

export default function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-end">
      {navListItemsAdmin.map(({ label, icon, url }) => (
        <Typography
          key={label}
          as="a"
          href={url}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          placeholder={undefined}
        >
          <MenuItem
            className="flex items-center gap-2 lg:rounded-full"
            placeholder={undefined}
          >
            {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
