import { OMDB_API_KEY } from "@env";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, YStack } from "tamagui";
import { OMDbMovie } from "../../types/omdb";

export default function ShowDetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); // id = imdbID
  const [movie, setMovie] = useState<OMDbMovie | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(console.error);
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <YStack f={1} p="$4">
      <Text fontSize="$7" fontWeight="700">{movie.Title}</Text>
      <Text mt="$1" color="$gray11">{movie.Year} | {movie.Genre}</Text>
      {movie.Poster && movie.Poster !== "N/A" && (
        <Image
          source={{ uri: movie.Poster }}
          height={300}
          br="$4"
          mt="$2"
        />
      )}
      <Text mt="$2">{movie.Plot}</Text>
      <Text mt="$2" fontSize="$3" color="$gray11">Director: {movie.Director}</Text>
      <Text fontSize="$3" color="$gray11">Actors: {movie.Actors}</Text>
    </YStack>
  );
}
