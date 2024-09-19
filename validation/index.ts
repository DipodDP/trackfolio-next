import * as z from "zod";

// Defining shapes of the forms using a Zod schemas.
export const EditPositionValidation = z.object({
  planProportionInPortfolio: z.coerce
    .number()
    .min(0)
    .max(100, { message: "Can't be over 100 %" }),
  targetProfit: z.coerce.number().min(0),
  exitDrawdown: z.coerce.number().min(0).max(100),
});
