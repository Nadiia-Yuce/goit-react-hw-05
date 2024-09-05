import clsx from "clsx";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const getActiveClass = ({ isActive }) => {
    return clsx(css.navigation, isActive && css.active);
  };

  return (
    <div>
      <nav>
        <NavLink to="/" className={getActiveClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
