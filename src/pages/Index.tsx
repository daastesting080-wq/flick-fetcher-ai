import { MovieSearch } from "@/components/MovieSearch";
import { Link } from "react-router-dom";

const selectedMovie = { id: 123, title: "Sample Movie" }; // Mocked movie data

const Index = () => {
  return (
    <div>
      <MovieSearch />
      <Link
        to={`/movie-player?movieId=${selectedMovie.id}&autoplay=true&ds_lang=en`}
        className="btn btn-primary"
      >
        Watch Now
      </Link>
    </div>
  );
};

export default Index;
