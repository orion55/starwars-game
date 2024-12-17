import { Box } from '@chakra-ui/react';
import backgroundImage from './assets/img01.jpg';
import { RoutePaths } from '@/app/routes.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useNavigate } from 'react-router';
import { MdOutlineArrowBackIos } from 'react-icons/md';

export const Character = () => {
  const navigate = useNavigate();
  return (
    <Box
      height='100vh'
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize='cover'
      backgroundPosition='right'
      padding='10px'
    >
      <Box width='100%' display='flex' justifyContent='flex-start' alignItems='center'>
        <Button
          size='md'
          backgroundColor='yellow.500'
          color='white'
          transition='background-color 0.3s ease'
          _hover={{
            bg: 'yellow.400',
            cursor: 'pointer',
          }}
          onClick={() => navigate(RoutePaths.Home)}
        >
          <MdOutlineArrowBackIos />
          Назад
        </Button>
      </Box>
    </Box>
  );
};
