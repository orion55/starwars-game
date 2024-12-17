import { Box, Flex, Text } from '@chakra-ui/react';
import backgroundImage from './assets/image01.jpg';
import { Logo } from '@/shared/Logo';
import { Button } from '@/shared/ui/button.tsx';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/app/routes.tsx';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      height='100vh'
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        paddingTop='10px'
        flexDirection='column'
        width='600px'
        margin='0 auto'
        gap={4}
      >
        <Logo />
        <Box
          backgroundColor='rgba(10, 7, 34, 0.7)'
          padding='10px'
          borderRadius='8px'
          boxShadow='lg'
          border='1px solid yellow'
        >
          <Text
            color='yellow.400'
            textAlign='center'
            textStyle='lg'
            fontWeight='bold'
            textShadow='lg'
          >
            Погрузитесь в захватывающий мир Star Wars.
            <br /> Создайте своего уникального персонажа и отправляйтесь в эпическое путешествие по
            галактике!
          </Text>
        </Box>
        <Button
          size='xl'
          backgroundColor='yellow.500'
          color='white'
          transition='transform 0.3s ease, background-color 0.3s ease'
          _hover={{
            bg: 'yellow.400',
            cursor: 'pointer',
            transform: 'scale(1.1)',
          }}
          _active={{
            transform: 'scale(1)',
          }}
          onClick={() => navigate(RoutePaths.Character)}
        >
          Создать персонажа
        </Button>
      </Flex>
    </Box>
  );
};
