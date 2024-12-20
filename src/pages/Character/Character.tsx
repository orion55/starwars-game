import { Box, Flex, Theme } from '@chakra-ui/react';
import backgroundImage from './assets/img01.jpg';
import { RoutePaths } from '@/app/routes.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useNavigate } from 'react-router';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { CharacterBuilder } from '@/widgets/CharacterBuilder';
import { Toaster } from '@/shared/ui/toaster.tsx';
import { motion } from 'framer-motion';

const MButton = motion.create(Button);

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
            <MButton
              size='md'
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
              onClick={() => navigate(RoutePaths.Home)}
            >
              <MdOutlineArrowBackIos />
              Назад
            </MButton>
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
