import toast, { Toaster } from "react-hot-toast";

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
    <div>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" autoFocus placeholder="Search movies" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
