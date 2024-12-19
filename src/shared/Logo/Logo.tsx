import logo from './logo.png';
import { Box, Image } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Box
      display='inline-block'
      p={3}
      rounded='full'
      transition='transform 0.4s ease'
      _hover={{
        transform: 'rotate(10deg) scale(1.1)', // Поворот и увеличение
      }}
      zIndex='1'
    >
      <Image
        src={logo}
        alt='logo'
        height='137px'
        width='320px'
        transition='transform 0.4s ease'
        _hover={{
          transform: 'rotate(-10deg)',
        }}
      />
    </Box>
  );
};
