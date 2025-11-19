import * as z from 'zod'

const ArgumentId = z.string()

const Shape = z.union([z.literal('circle'), z.literal('rectangle')])

const Position = z.strictObject({
  x: z.number(),
  y: z.number(),
})

const GraphicalData = z.strictObject({
  shape: Shape,
  postions: Position,
})

const Argument = z.strictObject({
  id: ArgumentId,
  name: z.string(),
  graphicalData: GraphicalData,
})

const Attack = z.strictObject({
  attacker: ArgumentId,
  attacked: ArgumentId,
})

const ArgumentationFramework = z.strictObject({
  arguments: z.array(Argument),
  attacks: z.array(Attack),
})

type ArgumentationFramework = z.infer<typeof ArgumentationFramework>

export default ArgumentationFramework
