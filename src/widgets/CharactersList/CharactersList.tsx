import { Flex, Grid, Text } from '@chakra-ui/react';
import { useCharactersStore } from '@/shared/stores/useCharacterStore.ts';
import isEmpty from 'lodash/isEmpty';
import { CharacterItem } from '@/entities/CharacterItem';

export const CharactersList = () => {
  const { characters } = useCharactersStore();

  if (isEmpty(characters)) return <></>;

  return (
    <Flex direction='column' alignItems='center' justifyContent='center' width='100%' mt={4}>
      <Text fontSize='xl' fontWeight='bold' mb={4} textAlign='center' color='white' zIndex='1'>
        Список персонажей
      </Text>
      <Grid templateColumns='repeat(3, 1fr)' gap='4'>
        {characters.map((character) => (
          <CharacterItem character={character} key={character.id} />
        ))}
      </Grid>
    </Flex>
  );
};
