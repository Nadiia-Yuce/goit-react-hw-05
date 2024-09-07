import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  // const [params] = useSearchParams();
  // const query = params.get("query") ?? "";

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div>
      <form>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
