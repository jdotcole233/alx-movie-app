import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { year, page, genre } = request.body;
  const date = new Date
  const resp = await fetch(
    `https://moviesdatabase.p.rapidapi.com/titles?year=${year || date.getFullYear()}&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`,
    {
      headers: {
        "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        "x-rapidapi-key": "d81ee71659mshd14bbe793779b46p117620jsn0ee204094a16",
      },
    }
  );

  if (!resp.ok) throw new Error("Failed to fetch movies");

  const moviesResponse = await resp.json();
  const movies: MoviesProps[] = moviesResponse.results;

  return response.status(200).json({
    movies,
  });
};

export default handler;