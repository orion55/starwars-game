import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .nonempty('Имя пользователя обязательно для заполнения')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя пользователя должно содержать только буквы и пробелы')
    .min(3, 'Имя пользователя должно содержать не менее 3 символов')
    .max(20, 'Имя пользователя должно содержать не более 20 символов'),
  planet: z.string().array().nonempty('Поле "Планета" обязателен для выбора'),
  starship: z.string().array().nonempty('Поле "Звездолёт" обязательно для заполнения'),
  specie: z.string().array().nonempty('Поле "Раса" обязательно для заполнения'),
});

export type FormValues = z.infer<typeof formSchema>;
