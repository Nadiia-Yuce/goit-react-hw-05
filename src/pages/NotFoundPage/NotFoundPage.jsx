import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>Error 404! Page is not found!</h1>
      <div className={css.back}>
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
}
