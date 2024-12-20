import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

export type Character = {
  id: string;
  name: string;
  planet: string;
  starship: string;
  specie: string;
};

type CharactersState = {
  characters: Character[];
  assignCharacters: (characters: Character[]) => void;
  setCharacter: (character: Character) => void;
  getCharacter: (id: string) => Character | undefined;
  deleteCharacter: (id: string) => void;
};

type CharactersPersist = (
  config: StateCreator<CharactersState>,
  options: PersistOptions<CharactersState>,
) => StateCreator<CharactersState>;

export const useCharactersStore = create<CharactersState, []>(
  (persist as CharactersPersist)(
    (set, get) => ({
      characters: [],
      assignCharacters: (characters) => set({ characters }),
      setCharacter: (character) => {
        const { characters } = get();
        let updatedCharacters = cloneDeep(characters);
        const index = findIndex(updatedCharacters, { id: character.id });
        if (~index) {
          updatedCharacters[index] = character;
        } else {
          updatedCharacters.push(character);
        }
        updatedCharacters = sortBy(updatedCharacters, 'name');
        set({ characters: updatedCharacters });
      },
      getCharacter: (id) => find(get().characters, { id }),
      deleteCharacter: (id) => {
        const { characters } = get();
        const updatedCharacters = filter(characters, (character) => character.id !== id);
        set({ characters: updatedCharacters });
      },
    }),
    {
      name: 'characters-store',
    },
  ),
);
