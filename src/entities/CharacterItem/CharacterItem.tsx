import { Character } from '@/shared/stores/useCharacterStore.ts';
import { Card } from '@chakra-ui/react';
import { Avatar } from '@/shared/ui/avatar.tsx';
import { Button } from '@/shared/ui/button.tsx';

interface CharacterItemProps {
  character: Character;
}

export const CharacterItem = (props: CharacterItemProps) => {
  const { character } = props;

  return (
    <Card.Root width='320px' backgroundColor='rgba(10, 7, 34, 0.7)' border='1px solid yellow'>
      <Card.Body gap='2'>
        <Avatar name={character.name} size='lg' shape='rounded' />
        <Card.Title mt='2'>{character.name}</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          nec odio vel dui euismod fermentum. Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <Button variant='outline'>Удалить</Button>
        <Button>Править</Button>
      </Card.Footer>
    </Card.Root>
  );
};
