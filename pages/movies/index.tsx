import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useEffect, useState } from "react";

interface MProps {
  movies: MoviesProps[]
}

const Movies: React.FC<MProps> = () => {

  const [page, setPage] = useState<number>(1)
  const [year, setYear] = useState<number | null>(null)
  const [genre, setGenre] = useState<string>("All")
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchMovies = async () => {
    setLoading(true)
    const response = await fetch('/api/fetch-movies', {
      method: 'POST',
      body: JSON.stringify({
        page,
        year, 
        genre: genre === "All" ? "" : genre
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
      setLoading(false)
    }

    const data = await response.json()
    const results = data.movies
    console.log(results)
    setMovies(results)
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies()
    console.log(page)
  }, [page, year, genre])



  // if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-44">
      <div className="py-16">
        <div className="flex justify-between mb-4 items-center space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
            className="border-2 border-[#E2D609] outline-none bg-transparent px-8 py-2 rounded-full"
          >
            <option value="">Select Year</option>
            {
              [2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
                <option value={year} key={year}>{year}</option>
              ))
            }
          </select>
        </div>


        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-bold">{year} {genre} Movie List</h1>
          <div className=" space-x-4">
            {
              ['All','Animation', 'Comedy', 'Fantasy'].map((genre: string, key: number) => (
                <Button title={genre} key={key} action={() => setGenre(genre)} />
              ))
            }
          </div>
        </div>


        {/* Movies output */}
        <div className="grid grid-cols-4 mt-10">
          {
            movies?.map((movie: MoviesProps, key: number) => (
              <MovieCard
                title={movie?.titleText.text}
                posterImage={movie?.primaryImage?.url}
                releaseYear={movie?.releaseYear.year}
                key={key} />
            ))
          }
        </div>
        <div className="flex justify-end space-x-4">
          <Button title="Previous" action={() => setPage(prev => prev > 1 ? page - 1 : 1)} />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>
      {
        loading && <Loading />
      }
    </div>
  )
}


export default Movies;