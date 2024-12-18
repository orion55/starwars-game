import axios from 'axios';
import { z } from 'zod';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import capitalize from 'lodash/capitalize';

const API_URL = 'https://swapi.tech/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

const itemSchema = z.object({
  uid: z.string(),
  name: z.string(),
  url: z.string(),
});

const apiResponseSchema = z.object({
  message: z.string(),
  total_records: z.number(),
  total_pages: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
  results: z.array(itemSchema),
});

type Item = z.infer<typeof itemSchema>;

function getSortedItems(items: Item[]): string[] {
  return sortBy(
    map(items, 'name')
      .filter((name) => name.toLowerCase() !== 'unknown')
      .map(capitalize),
  );
}

async function fetchAllPages(endpoint: string): Promise<Item[]> {
  let allItems: Item[] = [];
  let nextPage: string | null = endpoint;

  while (nextPage) {
    const { data } = await apiClient.get(nextPage);
    const parsedData = apiResponseSchema.parse(data);

    allItems = [...allItems, ...parsedData.results];
    nextPage = parsedData.next;
  }

  return allItems;
}

async function fetchData(endpoint: string) {
  const allItems = await fetchAllPages(endpoint);
  return getSortedItems(allItems);
}

export const fetchPlanets = async () => fetchData('/planets');
export const fetchStarships = async () => fetchData('/starships');
export const fetchSpecies = async () => fetchData('/species');
