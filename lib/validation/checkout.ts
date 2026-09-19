import { z } from 'zod'

export const checkoutSchema = z.object({
  // Información del comprador
  firstName: z
    .string()
    .min(2, 'Ingresa tu nombre.')
    .max(60, 'El nombre es demasiado largo.'),
  lastName: z
    .string()
    .min(2, 'Ingresa tus apellidos.')
    .max(60, 'Los apellidos son demasiado largos.'),
  document: z
    .string()
    .max(20, 'El documento es demasiado largo.')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Ingresa un correo electrónico válido.'),
  phone: z
    .string()
    .min(7, 'Ingresa un número de teléfono válido.')
    .regex(/^[0-9+\s()-]{7,20}$/, 'Ingresa un número de teléfono válido.'),

  // Información de entrega
  department: z.string().min(2, 'Selecciona o ingresa el departamento.'),
  cityName: z.string().min(2, 'Ingresa la ciudad.'),
  address: z.string().min(5, 'Ingresa una dirección válida.'),
  complement: z.string().max(120).optional().or(z.literal('')),
  neighborhood: z.string().min(2, 'Ingresa el barrio.'),
  postalCode: z
    .string()
    .max(12, 'Código postal inválido.')
    .optional()
    .or(z.literal('')),
  notes: z.string().max(400, 'Las notas son demasiado largas.').optional().or(z.literal('')),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
