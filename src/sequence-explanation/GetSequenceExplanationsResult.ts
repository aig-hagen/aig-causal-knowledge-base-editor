import * as z from 'zod'
import { ArgumentSerialized } from '@/sequence-explanation/ArgumentSerialized'
import { DialectialSequenceExplanationDTO } from '@/sequence-explanation/DialectialSequenceExplanationDTO'

export const GetSequenceExplanationsResult = z.strictObject({
  type: z.literal('get_sequence_explanations'),
  perArgumentSequenceExplanations: z.record(
    ArgumentSerialized,
    z.array(DialectialSequenceExplanationDTO),
  ),
})
export type GetSequenceExplanationsResult = z.infer<typeof GetSequenceExplanationsResult>
