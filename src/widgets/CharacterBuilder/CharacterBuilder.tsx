import { Button } from '@/shared/ui/button.tsx';
import { Controller, useForm } from 'react-hook-form';
import { Box, Input, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@/shared/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/shared/ui/select';
import { useStarWarsData } from '@/widgets/CharacterBuilder/hooks/useStarWarsData.ts';
import { ErrorBox } from './ui/ErrorBox';
import { AxiosError } from 'axios';
import { formSchema, FormValues } from './model/schema.ts';
import { Character, useCharactersStore } from '@/shared/stores/useCharacterStore.ts';
import { v4 as uuidv4 } from 'uuid';
import head from 'lodash/head';
import { toaster } from '@/shared/ui/toaster.tsx';
import { RoutePaths } from '@/app/routes.tsx';
import { useNavigate } from 'react-router';

export const CharacterBuilder = () => {
  const { setCharacter } = useCharactersStore();
  const { isLoading, isError, errorsData, planets, starships, species } = useStarWarsData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      planet: [],
      starship: [],
      specie: [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    const { name, planet, starship, specie } = data;

    setCharacter({
      id: uuidv4(),
      name,
      planet: head(planet),
      starship: head(starship),
      specie: head(specie),
    } as Character);

    toaster.create({
      description: 'Персонаж успешно создан!',
      type: 'success',
    });

    setTimeout(() => {
      reset();
      navigate(RoutePaths.Home);
    }, 750);
  });

  if (isLoading) {
    return (
      <VStack>
        <Spinner color='yellow.400' size='lg' />
        <Text color='yellow.400'>Загрузка...</Text>
      </VStack>
    );
  }

  if (isError) return <ErrorBox errors={errorsData as AxiosError[]} />;

  return (
    <Box width='400px'>
      <form onSubmit={onSubmit}>
        <Stack gap='4' align='flex-start'>
          <Field
            label='Имя'
            invalid={!!errors.name}
            errorText={errors.name?.message}
            width='100%'
            color='yellow.500'
          >
            <Input
              {...register('name', { required: 'Name is required' })}
              variant='subtle'
              colorPalette='yellow'
            />
          </Field>
          <Field
            label='Планета'
            invalid={!!errors.planet}
            errorText={errors.planet?.message}
            width='100%'
            color='yellow.500'
          >
            <Controller
              control={control}
              name='planet'
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={planets}
                  variant='subtle'
                  size='md'
                >
                  <SelectTrigger clearable>
                    <SelectValueText placeholder='Выберите планету' />
                  </SelectTrigger>
                  <SelectContent backgroundColor='gray.900'>
                    {planets.items.map((planet) => (
                      <SelectItem
                        item={planet}
                        key={planet}
                        color='yellow.500'
                        backgroundColor='gray.900'
                        cursor='pointer'
                      >
                        {planet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label='Звездолёт'
            invalid={!!errors.starship}
            errorText={errors.starship?.message}
            width='100%'
            color='yellow.500'
          >
            <Controller
              control={control}
              name='starship'
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={starships}
                  variant='subtle'
                  size='md'
                >
                  <SelectTrigger clearable>
                    <SelectValueText placeholder='Выберите звездолёт' />
                  </SelectTrigger>
                  <SelectContent backgroundColor='gray.900'>
                    {starships.items.map((starship) => (
                      <SelectItem
                        item={starship}
                        key={starship}
                        color='yellow.500'
                        backgroundColor='gray.900'
                        cursor='pointer'
                      >
                        {starship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label='Раса'
            invalid={!!errors.specie}
            errorText={errors.specie?.message}
            width='100%'
            color='yellow.500'
          >
            <Controller
              control={control}
              name='specie'
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={species}
                  variant='subtle'
                  size='md'
                >
                  <SelectTrigger clearable>
                    <SelectValueText placeholder='Выберите расу' />
                  </SelectTrigger>
                  <SelectContent backgroundColor='gray.900'>
                    {species.items.map((specie) => (
                      <SelectItem
                        item={specie}
                        key={specie}
                        color='yellow.500'
                        backgroundColor='gray.900'
                        cursor='pointer'
                      >
                        {specie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>
          <Button color='white' backgroundColor='yellow.500' type='submit' width='100%' mt={2}>
            Создать персонажа
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
