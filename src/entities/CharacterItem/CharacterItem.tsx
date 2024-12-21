import { Character, useCharactersStore } from '@/shared/stores/useCharacterStore.ts';
import { Box, Card, Text } from '@chakra-ui/react';
import { Avatar } from '@/shared/ui/avatar.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { DataListItem, DataListRoot } from '@/shared/ui/data-list.tsx';
import { FiUser } from 'react-icons/fi';
import { IoPlanetOutline } from 'react-icons/io5';
import { PiAirplaneTiltLight } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { useDialogStore } from '@/shared/stores/useDialogStore.ts';
import { generatePath, useNavigate } from 'react-router';
import { RoutePaths } from '@/app/routes.tsx';

interface CharacterItemProps {
  character: Character;
  index: number;
}

const customDataListItem = {
  '& > dt': {
    minWidth: '80px',
    color: 'white',
  },
};

const MButton = motion.create(Button);
const MBox = motion.create(Box);

const cardVariants = {
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
    },
  }),
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
};

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, index } = props;
  const { name, planet, starship, specie } = character;
  const { openDialog } = useDialogStore();
  const { setCurrentCharacter } = useCharactersStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    setCurrentCharacter(character);
    openDialog();
  };

  const handleEdit = () => {
    const path = generatePath(RoutePaths.CharacterEdit, { id: character.id });
    navigate(path);
  };

  return (
    <MBox width='320px' variants={cardVariants} initial='hidden' animate='visible' custom={index}>
      <Card.Root backgroundColor='rgba(10, 7, 34, 0.7)' border='1px solid yellow'>
        <Card.Body gap='2'>
          <Avatar name={name} size='lg' shape='rounded' />
          <Card.Title mt='2'>{name}</Card.Title>
          <Card.Description as='div'>
            <DataListRoot orientation='horizontal' size='md' variant='bold'>
              <DataListItem
                label='Планета'
                value={
                  <Box
                    display='grid'
                    alignItems='center'
                    justifyContent='center'
                    gridTemplateColumns='20px 1fr'
                    gap={2}
                  >
                    <IoPlanetOutline size={20} color='#FFD700' />
                    <Text truncate>{planet}</Text>
                  </Box>
                }
                {...customDataListItem}
              />
              <DataListItem
                label='Звездолёт'
                value={
                  <Box
                    display='grid'
                    alignItems='center'
                    justifyContent='center'
                    gridTemplateColumns='20px 1fr'
                    gap={2}
                  >
                    <PiAirplaneTiltLight size={20} color='#FFD700' />
                    <Text truncate>{starship}</Text>
                  </Box>
                }
                {...customDataListItem}
              />
              <DataListItem
                label='Раса'
                value={
                  <Box
                    display='grid'
                    alignItems='center'
                    justifyContent='center'
                    gridTemplateColumns='20px 1fr'
                    gap={2}
                  >
                    <FiUser size={20} color='#FFD700' />
                    <Text truncate>{specie}</Text>
                  </Box>
                }
                {...customDataListItem}
              />
            </DataListRoot>
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent='flex-end'>
          <MButton
            variant='outline'
            backgroundColor='#0A0722'
            size='xs'
            whileHover={{
              backgroundColor: '#422006',
              transition: {
                backgroundColor: { duration: 0.4 },
              },
            }}
            onClick={handleDelete}
          >
            Удалить
          </MButton>
          <MButton
            size='xs'
            backgroundColor='#eab308'
            whileHover={{
              backgroundColor: '#fde047',
              transition: {
                backgroundColor: { duration: 0.4 },
              },
            }}
            onClick={handleEdit}
          >
            Править
          </MButton>
        </Card.Footer>
      </Card.Root>
    </MBox>
  );
};
