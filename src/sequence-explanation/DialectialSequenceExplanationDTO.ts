import * as z from 'zod'
import { ArgumentSerialized } from '@/sequence-explanation/ArgumentSerialized'

export const DialectialSequenceExplanationDTO = z.strictObject({
  argument: ArgumentSerialized,
  supporters: z.array(z.array(ArgumentSerialized)),
  defeated: z.array(z.array(ArgumentSerialized)),
})
export type DialectialSequenceExplanationDTO = z.infer<typeof DialectialSequenceExplanationDTO>
