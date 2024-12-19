import { useQueries } from '@tanstack/react-query';
import { fetchPlanets, fetchSpecies, fetchStarships } from '../api/swAPI.ts';
import { useMemo } from 'react';
import { createListCollection } from '@chakra-ui/react';

const ONE_DAY = 1000 * 60 * 60 * 24; // 1 день (24 часа) в миллисекундах

export const QUERY_KEYS = {
  PLANETS: 'planets',
  STARSHIPS: 'starships',
  SPECIES: 'species',
} as const;

const queriesConfig = [
  {
    queryKey: [QUERY_KEYS.PLANETS],
    queryFn: fetchPlanets,
    staleTime: ONE_DAY,
    retry: 1,
  },
  {
    queryKey: [QUERY_KEYS.STARSHIPS],
    queryFn: fetchStarships,
    staleTime: ONE_DAY,
    retry: 1,
  },
  {
    queryKey: [QUERY_KEYS.SPECIES],
    queryFn: fetchSpecies,
    staleTime: ONE_DAY,
    retry: 1,
  },
];

export const useStarWarsData = () => {
  const results = useQueries({
    queries: queriesConfig.map((query) => ({
      ...query,
    })),
  });

  const [planetsInfo, starshipsInfo, speciesInfo] = results;

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const errorsData = results.filter((result) => result.isError).map((result) => result.error);

  const planets = useMemo(
    () =>
      createListCollection({
        items: planetsInfo.data || [],
      }),
    [planetsInfo.data],
  );

  const starships = useMemo(
    () =>
      createListCollection({
        items: starshipsInfo.data || [],
      }),
    [starshipsInfo.data],
  );

  const species = useMemo(
    () =>
      createListCollection({
        items: speciesInfo.data || [],
      }),
    [speciesInfo.data],
  );

  return { isLoading, isError, errorsData, planets, starships, species };
};
