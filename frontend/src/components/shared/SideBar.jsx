import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo"

import { BookOpen, Boxes, BuildingComplex, Users } from "lucide-react"

const menuItems = [
  { name: "Books", href: "/", icon: BookOpen },
  { name: "Géneros", href: "/generos", icon: Boxes },
  { name: "Editoriales", href: "/editoriales", icon: BuildingComplex },
  { name: "Usuarios", href: "/usuarios", icon: Users },
];

const baseItemStyle = "flex items-center p-3 hover:bg-sidebar-hover hover:rounded-md text-sm h-11";
const activeItemStyle = "bg-sidebar-hover text-item-text-active rounded-md after:absolute after:w-[3px] after:h-1/2 after:bg-brand after:left-0 after:top-3 after:rounded-md";
const inactiveItemStyle = "text-item-text";

function SideBar() {
  return (
    <div className="flex flex-col w-66 h-screen bg-sidebar text-white py-6 px-4 gap-6">
      <Logo className="bg-sidebar" />
      <nav className="">
      <p className="h-8 px-3 flex items-center text-on-dark-muted text-overline">CATÁLOGO</p>
        <ul className="flex flex-col gap-1">
          {menuItems.map(({ name, href, icon: Icon }) =>
            <li className="text-sm h-11 relative" key={href}>
              <NavLink className={({ isActive }) => `${baseItemStyle} ${isActive ? activeItemStyle : inactiveItemStyle}`} to={href} end={href === "/"}>
                <Icon className="w-5 h-5" />
                <span className="ml-3">{name}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default SideBar