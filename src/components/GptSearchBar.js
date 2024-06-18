import { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import useGptMovieSearch from "../hooks/useGptMovieSearch";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const { searchGptMovies, loading, error } = useGptMovieSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGptSearchClick = async () => {
    try {
      const query = searchText.current.value;
      //console.log("Search Query: ", query);
      await searchGptMovies(query);
    } catch (err) {
      //console.error("Error during GPT Movie Search: ", err.message);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={handleSubmit}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
          disabled={loading}
        />
        <button
          type="button"
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Loading..." : lang[langKey].search}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default GptSearchBar;
