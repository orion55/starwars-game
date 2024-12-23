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
  currentCharacter: Character | null;
  setCharacter: (character: Character) => void;
  setCurrentCharacter: (character: Character | null) => void;
  getCharacter: (id: string) => Character | undefined;
  deleteCurrentCharacter: () => void;
};

type CharactersPersist = (
  config: StateCreator<CharactersState>,
  options: PersistOptions<CharactersState>,
) => StateCreator<CharactersState>;

export const useCharactersStore = create<CharactersState, []>(
  (persist as CharactersPersist)(
    (set, get) => ({
      characters: [],
      currentCharacter: null,
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
      setCurrentCharacter: (character) => set({ currentCharacter: character }),
      getCharacter: (id) => find(get().characters, { id }),
      deleteCurrentCharacter: () => {
        const { characters, currentCharacter, setCurrentCharacter } = get();
        const updatedCharacters = filter(
          characters,
          (character) => character.id !== currentCharacter?.id,
        );
        set({ characters: updatedCharacters });
        setCurrentCharacter(null);
      },
    }),
    {
      name: 'characters-store',
    },
  ),
);
