import { Button } from '@/shared/ui/button.tsx';
// import { useStarWarsData } from '@/widgets/CharacterBuilder/hooks/useStarWarsData.ts';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Box, createListCollection, Input, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@/shared/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/shared/ui/select';
import { useMemo } from 'react';
import { useStarWarsData } from '@/widgets/CharacterBuilder/hooks/useStarWarsData.ts';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Поле "Имя" обязательно для заполнения!' }),
  planet: z.string().min(1, { message: 'Поле "Планета" обязательно для заполнения' }).array(),
  starship: z.string({ message: 'Поле "Космический корабль" обязательно для заполнения' }).array(),
  specie: z.string({ message: 'Поле "Вид" обязательно для заполнения' }).array(),
});

type FormValues = z.infer<typeof formSchema>;

export const CharacterBuilder = () => {
  // const { characters, setCharacter } = useCharactersStore();
  const results = useStarWarsData();
  const [planetsInfo, starshipsInfo, speciesInfo] = results;

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const errorsData = results.filter((result) => result.isError).map((result) => result.error);

  const planets = useMemo(
    () =>
      createListCollection({
        items: planetsInfo.data || [],
      }),
    [planetsInfo.data],
  );

  const starships = useMemo(
    () =>
      createListCollection({
        items: starshipsInfo.data || [],
      }),
    [starshipsInfo.data],
  );

  const species = useMemo(
    () =>
      createListCollection({
        items: speciesInfo.data || [],
      }),
    [speciesInfo.data],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  if (isLoading) {
    return (
      <VStack>
        <Spinner color='yellow.400' size='lg' />
        <Text color='yellow.400'>Загрузка...</Text>
      </VStack>
    );
  }
  console.log({ errors });
  return (
    <Box width='320px'>
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
                  <SelectTrigger>
                    <SelectValueText placeholder='Выберите планету' />
                  </SelectTrigger>
                  <SelectContent>
                    {planets.items.map((planet) => (
                      <SelectItem item={planet} key={planet} color='yellow.500'>
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
                  <SelectTrigger>
                    <SelectValueText placeholder='Выберите звездолёт' />
                  </SelectTrigger>
                  <SelectContent>
                    {starships.items.map((starship) => (
                      <SelectItem item={starship} key={starship} color='yellow.500'>
                        {starship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label='Вид'
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
                  <SelectTrigger>
                    <SelectValueText placeholder='Выберите вид' />
                  </SelectTrigger>
                  <SelectContent>
                    {species.items.map((specie) => (
                      <SelectItem item={specie} key={specie} color='yellow.500'>
                        {specie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Button color='white' backgroundColor='yellow.500' type='submit' width='100%'>
            Создать персонажа
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
