import { z } from "zod";

// Schema de validación para login
export const invoiceSchema = z.object({
    amount: z.number(),
    assignmentId: z.uuid(),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
