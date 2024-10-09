import * as z from "zod";

// Defining shapes of the forms using a Zod schemas.
export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  // token: type === 'sign-in' ? z.string().optional() : z.string().length(88),
  // both
  email: z.string().email(),
  password: z.string().min(6),
})

export const EditPositionValidation = z.object({
  planProportionInPortfolio: z.coerce
    .number()
    .min(0)
    .max(100, { message: "Can't be over 100 %" }),
  targetProfit: z.coerce.number().min(0),
  exitDrawdown: z.coerce.number().min(0).max(100),
});
