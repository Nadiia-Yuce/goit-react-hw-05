import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();

    if (!query) {
      toast("The field can not be empty!", {
        icon: "❗️",
        duration: 4000,
      });

      return;
    }
    onSubmit(query);
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.formBtn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
