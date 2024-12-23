import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .nonempty('Имя пользователя обязательно для заполнения')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя пользователя должно содержать только буквы и пробелы')
    .min(3, 'Имя пользователя должно содержать не менее 3 символов')
    .max(20, 'Имя пользователя должно содержать не более 20 символов'),
  planet: z
    .string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: 'Поле "Планета" обязателено для выбора',
    }),
  starship: z
    .string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: 'Поле "Звездолёт" обязательно для заполнения',
    }),
  specie: z
    .string()
    .array()
    .refine((arr) => arr.length > 0, {
      message: 'Поле "Раса" обязательно для заполнения',
    }),
});

export type FormValues = z.infer<typeof formSchema>;

export const INITIAL_DEFAULT_VALUES: FormValues = {
  name: '',
  planet: [] as string[],
  starship: [] as string[],
  specie: [] as string[],
};
