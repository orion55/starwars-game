import { Box, Flex, Theme } from '@chakra-ui/react';
import backgroundImage from './assets/img01.jpg';
import { RoutePaths } from '@/app/routes.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useNavigate } from 'react-router';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { CharacterBuilder } from '@/widgets/CharacterBuilder';
import { Toaster } from '@/shared/ui/toaster.tsx';

export const Character = () => {
  const navigate = useNavigate();

  return (
    <>
      <Theme appearance='dark' colorPalette='yellow'>
        <Box
          height='100vh'
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize='cover'
          backgroundPosition='right'
          padding='10px'
          display='flex'
          justifyContent='flex-start'
          alignItems='center'
          flexDirection='column'
        >
          <Flex width='100%' justifyContent='flex-start' alignItems='center'>
            <Button
              size='md'
              backgroundColor='yellow.500'
              color='white'
              transition='background-color 0.3s ease'
              _hover={{
                bg: 'yellow.400',
                cursor: 'pointer',
                transform: 'scale(1.05)',
                transition: 'transform 0.4s ease',
              }}
              _active={{
                transform: 'scale(1)',
              }}
              onClick={() => navigate(RoutePaths.Home)}
            >
              <MdOutlineArrowBackIos />
              Назад
            </Button>
          </Flex>
          <Flex width='100%' justifyContent='center' alignItems='center' flex='1 0 auto'>
            <CharacterBuilder />
          </Flex>
        </Box>
      </Theme>
      <Toaster />
    </>
  );
};
