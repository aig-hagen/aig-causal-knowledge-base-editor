import * as z from 'zod'

export const ArgumentSerialized = z.string()
export type ArgumentSerialized = z.infer<typeof ArgumentSerialized>
