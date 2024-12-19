import { Box, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';

interface ErrorBoxProps {
  errors: AxiosError[];
}

export const ErrorBox = (props: ErrorBoxProps) => {
  const { errors } = props;

  return (
    <Box width='320px' padding='16px' borderRadius='8px' backgroundColor='red.600' boxShadow='lg'>
      <Text fontSize='lg' fontWeight='bold' color='white' marginBottom='8px'>
        Ошибки загрузки данных
      </Text>
      <Box height='1px' backgroundColor='red.300' marginBottom='8px' />
      {errors.map((error, index) => (
        <Box
          key={`error-${index}`}
          marginBottom='12px'
          padding='8px'
          border='1px solid'
          borderColor='red.400'
          borderRadius='6px'
          backgroundColor='red.700'
        >
          <Text fontSize='md' fontWeight='medium' color='white'>
            {error.message}
          </Text>
          <Text fontSize='sm' color='gray.300' marginTop='4px'>
            URL: {error.config?.url || 'N/A'}
          </Text>
          <Text fontSize='sm' color='gray.300'>
            Метод: {error.config?.method?.toUpperCase() || 'N/A'}
          </Text>
          <Text fontSize='xs' color='gray.300' marginTop='4px'>
            Код ошибки: {error.code || 'N/A'}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
