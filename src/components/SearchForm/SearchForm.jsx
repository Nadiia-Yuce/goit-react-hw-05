import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

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

    // setSearchParams({
    //   query,
    //   page: 1,
    // });

    searchParams.set("query", query);
    setSearchParams(searchParams);

    // searchParams.set("page", 1);
    // setSearchParams(searchParams);
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
