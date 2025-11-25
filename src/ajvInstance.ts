import Ajv from 'ajv'

// XXX Only older parts of the application use Ajv.
// Newer parts started using Zod.
// Eventually Ajv should be removed altogether.
export const ajv = new Ajv({ allErrors: true })
