import { Box, Flex, Text, Theme } from '@chakra-ui/react';
import backgroundImage from './assets/background.jpg';
import { Logo } from '@/shared/Logo';
import { Button } from '@/shared/ui/button.tsx';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/app/routes.tsx';
import { CharactersList } from '@/widgets/CharactersList';
import { motion } from 'framer-motion';
import { AlertDialog } from '@/entities/AlertDialog';

const MButton = motion.create(Button);

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Theme appearance='dark' colorPalette='yellow'>
      <Box position='relative' width='100%' backgroundColor='#0A0722' padding='20px'>
        <Box
          height='100vh'
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize='cover'
          backgroundPosition='right'
          width='100%'
          position='absolute'
          left='0'
          top='0'
        />
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          gap={4}
          width={['100%', '100%', '600px', '600px']}
          margin='0 auto'
        >
          <Logo />
          <Box
            backgroundColor='rgba(10, 7, 34, 0.7)'
            padding='10px'
            borderRadius='8px'
            boxShadow='lg'
            border='1px solid yellow'
            zIndex='1'
          >
            <Text
              color='yellow.400'
              textAlign='center'
              textStyle='lg'
              fontWeight='bold'
              textShadow='lg'
            >
              Погрузитесь в захватывающий мир Star Wars. Создайте своего уникального персонажа и
              отправляйтесь в эпическое путешествие по галактике!
            </Text>
          </Box>
          <Box width='100%'>
            <MButton
              size='xl'
              backgroundColor='#eab308'
              color='white'
              whileHover={{
                scale: 1.05,
                backgroundColor: '#facc15',
                transition: {
                  scale: { duration: 0.3 },
                  backgroundColor: { duration: 0.3 },
                },
              }}
              whileTap={{
                scale: 1,
              }}
              onClick={() => navigate(RoutePaths.Character)}
              width='100%'
            >
              Создать персонажа
            </MButton>
          </Box>
        </Flex>
        <CharactersList />
      </Box>
      <AlertDialog />
    </Theme>
  );
};
