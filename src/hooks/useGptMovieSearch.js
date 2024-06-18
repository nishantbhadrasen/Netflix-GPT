import { useState } from "react";
import { useDispatch } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const useGptMovieSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      throw new Error(`Failed to fetch movie data from TMDB: ${err.message}`);
    }
  };

  const searchGptMovies = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query ${query}. Only give me names of 5 movies, comma separated like the example result ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      if (!gptResults.choices) {
        throw new Error("No choices returned from GPT API");
      }

      const gptMovies =
        gptResults.choices[0]?.message?.content.split(",") || [];
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      //console.log("GPT Movies: ", gptMovies);
      //console.log("Array of promises: ", promiseArray);

      const tmdbResults = await Promise.all(promiseArray);

      //console.log("TMDB Results: ", tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );

      return { gptMovies, tmdbResults };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { searchGptMovies, loading, error };
};

export default useGptMovieSearch;
