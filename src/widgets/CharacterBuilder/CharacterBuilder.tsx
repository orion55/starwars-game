import { Button } from '@/shared/ui/button.tsx';
// import { useStarWarsData } from '@/widgets/CharacterBuilder/hooks/useStarWarsData.ts';
import { z } from 'zod';
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

const formSchema = z.object({
  name: z
    .string()
    .nonempty('Имя пользователя обязательно для заполнения')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя пользователя должно содержать только буквы и пробелы')
    .min(3, 'Имя пользователя должно содержать не менее 3 символов')
    .max(20, 'Имя пользователя должно содержать не более 20 символов'),
  // planet: z.string().array().nonempty("Поле 'Планета' обязателен для выбора"),
  planet: z.string().array().nonempty({
    message: "Can't be empty!",
  }),
  starship: z.string({ message: 'Поле "Космический корабль" обязательно для заполнения' }).array(),
  specie: z.string({ message: 'Поле "Вид" обязательно для заполнения' }).array(),
});

type FormValues = z.infer<typeof formSchema>;

export const CharacterBuilder = () => {
  // const { characters, setCharacter } = useCharactersStore();
  const { isLoading, isError, errorsData, planets, starships, species } = useStarWarsData();

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

  if (isError) {
    return <ErrorBox errors={errorsData as AxiosError[]} />;
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
