import logo from './logo.png';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MBox = motion.create(Box);
const MImage = motion.create(Image);

export const Logo = () => {
  return (
    <MBox
      p={3}
      rounded='full'
      whileHover={{
        rotate: 10,
        scale: 1.1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      zIndex='1'
    >
      <MImage
        src={logo}
        alt='logo'
        height='137px'
        width={['100%', '100%', '320px', '320px']}
        whileHover={{
          rotate: -10,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
    </MBox>
  );
};
