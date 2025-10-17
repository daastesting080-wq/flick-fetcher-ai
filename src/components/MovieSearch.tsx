import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Calendar, Clock, Play, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  imdb_id?: string;
}

const TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8"; // Public API key for demo
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const { toast } = useToast();

  const searchMovies = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error searching movies:", error);
      toast({
        title: "Error",
        description: "Failed to search movies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (movieId: number) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const movieDetails = await response.json();
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      toast({
        title: "Error",
        description: "Failed to load movie details.",
        variant: "destructive",
      });
    }
  };

  const getVidsrcUrl = (movieId: number, options?: { autoplay?: boolean; ds_lang?: string; sub_url?: string }) => {
    const baseUrl = `https://vidsrc.xyz/embed/movie?tmdb=${movieId}`;
    const params = new URLSearchParams();

    if (options?.autoplay !== undefined) {
      params.append('autoplay', options.autoplay ? '1' : '0');
    }

    if (options?.ds_lang) {
      params.append('ds_lang', options.ds_lang);
    }

    if (options?.sub_url) {
      params.append('sub_url', encodeURIComponent(options.sub_url));
    }

    return `${baseUrl}&${params.toString()}`;
  };

  const playMovie = () => {
    if (selectedMovie) {
      setShowVideoPlayer(true);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchMovies(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <div className="cinema-gradient py-16 px-4 animate-fade-in">
        <div className="container mx-auto text-center">
          <div className="glass-strong rounded-2xl p-8 max-w-3xl mx-auto animate-scale-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in">
              CineSearch
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 animate-fade-in [animation-delay:100ms]">
              Discover your next favorite movie
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
              <div className="relative glass-strong rounded-xl p-2 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground/60 transition-all duration-300" size={20} />
                <Input
                  type="text"
                  placeholder="Search for movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-14 pr-4 py-3 text-lg bg-transparent border-transparent focus:border-primary/30 text-foreground placeholder:text-foreground/60 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Searching movies...</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="movie-card cursor-pointer group glass-strong animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => getMovieDetails(movie.id)}
              >
                <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">No Poster</span>
                    </div>
                  )}
                  
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 glass-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="glass-strong rounded-full p-4">
                      <Play className="w-16 h-16 text-primary animate-scale-in fill-primary" />
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  {movie.vote_average > 0 && (
                    <div className="absolute top-2 right-2 glass-strong rounded-full px-2 py-1 flex items-center gap-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                      <Star className="w-3 h-3 fill-rating-gold text-rating-gold transition-transform duration-300 group-hover:rotate-12" />
                      <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-primary">{movie.title}</h3>
                  {movie.release_date && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                      <Calendar className="w-3 h-3 transition-transform duration-300 group-hover:scale-110" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && query && movies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No movies found for "{query}"</p>
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 glass-strong z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-glow border-2 border-primary/20">
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 glass transition-all duration-300 hover:scale-110 hover:rotate-90"
                onClick={() => setSelectedMovie(null)}
              >
                ✕
              </Button>

              {/* Movie Details */}
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="md:w-1/3 animate-fade-in">
                  {selectedMovie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`}
                      alt={selectedMovie.title}
                      className="w-full rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 hover:rotate-1"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">No Poster</span>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3 animate-fade-in [animation-delay:100ms]">
                  <h2 className="text-3xl font-bold mb-4 animate-fade-in">{selectedMovie.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {selectedMovie.vote_average > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-rating-gold text-rating-gold" />
                        <span className="font-semibold">{selectedMovie.vote_average.toFixed(1)}/10</span>
                      </div>
                    )}
                    
                    {selectedMovie.release_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                        <span>{new Date(selectedMovie.release_date).getFullYear()}</span>
                      </div>
                    )}
                    
                    {selectedMovie.runtime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                        <span>{selectedMovie.runtime} min</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedMovie.overview || "No overview available."}
                    </p>
                  </div>

                  <div className="flex gap-4 animate-fade-in [animation-delay:300ms]">
                    <Button 
                      className="cinema-gradient text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow"
                      onClick={playMovie}
                    >
                      <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                      Watch Now
                    </Button>
                    <Button variant="outline" className="transition-all duration-300 hover:scale-105 hover:border-primary">
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideoPlayer && selectedMovie && (
        <div className="fixed inset-0 glass-strong z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-strong rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in shadow-glow border-2 border-primary/20">
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 glass transition-all duration-300 hover:scale-110 hover:rotate-90"
                onClick={() => setShowVideoPlayer(false)}
              >
                ✕
              </Button>

              {/* Video Header */}
              <div className="p-6 border-b border-border animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedMovie.title}
                </h2>
                <p className="text-muted-foreground">
                  Powered by VidSrc • Multiple streaming sources available
                </p>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black animate-fade-in [animation-delay:100ms]">
                <iframe
                  src={getVidsrcUrl(selectedMovie.id, { autoplay: true, ds_lang: 'en' })}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={`Watch ${selectedMovie.title}`}
                />
              </div>

              {/* Video Footer */}
              <div className="p-6 border-t border-border animate-fade-in [animation-delay:200ms]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {selectedMovie.vote_average > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-rating-gold text-rating-gold" />
                        <span className="font-medium">{selectedMovie.vote_average.toFixed(1)}/10</span>
                      </div>
                    )}
                    
                    {selectedMovie.release_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(selectedMovie.release_date).getFullYear()}</span>
                      </div>
                    )}
                    
                    {selectedMovie.runtime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedMovie.runtime} min</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="transition-all duration-300 hover:scale-105 hover:border-primary"
                    onClick={() => window.open(getVidsrcUrl(selectedMovie.id), '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-45" />
                    Open in New Tab
                  </Button>
                </div>

                {selectedMovie.overview && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedMovie.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};