import { NavLink } from "react-router-dom";
import { navLists } from "../constants";
import { NavbarProps } from "../types";

const Navbar = () => {
  return (
    <header className="w-full flex justify-center items-center gap-4 py-4">
      {navLists.map(({ name, path }: NavbarProps, i: number) => (
        <NavLink
          to={path}
          key={i}
          className={({ isActive }) =>
            `text-xl border-2 rounded-lg p-4 cursor-pointer hover:bg-blue-200 hover:text-black ${
              isActive ? "bg-blue-200 text-black" : ""
            } transition-all`
          }
        >
          {name}
        </NavLink>
      ))}
    </header>
  );
};

export default Navbar;
