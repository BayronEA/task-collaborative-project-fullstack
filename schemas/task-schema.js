import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string({
      required_error: 'El título es requerido',
    })
    .min(1, {
      message: 'El título no puede estar vacío',
    }),
  description: z
    .string({
      required_error: 'La descripción es requerida',
    })
    .min(1, {
      message: 'La descripción no puede estar vacía',
    }),
  date: z.string().datetime().optional(),
})

// El middleware espera el schema directamente, no una función
export const validateTaskSchema = taskSchema
