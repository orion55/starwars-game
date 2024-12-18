import { useQueries } from '@tanstack/react-query';
import { fetchPlanets, fetchSpecies, fetchStarships } from '../api/swAPI.ts';

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
  },
  {
    queryKey: [QUERY_KEYS.STARSHIPS],
    queryFn: fetchStarships,
    staleTime: ONE_DAY,
  },
  {
    queryKey: [QUERY_KEYS.SPECIES],
    queryFn: fetchSpecies,
    staleTime: ONE_DAY,
  },
];

export const useStarWarsData = () => {
  return useQueries({
    queries: queriesConfig.map((query) => ({
      ...query,
    })),
  });
};
