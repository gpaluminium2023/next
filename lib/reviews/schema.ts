import { z } from "zod";

// Shared between the API route and the client form so the two can't drift.
export const reviewSubmissionSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  authorLocation: z
    .string()
    .trim()
    .max(80, "Location is too long")
    .optional()
    .or(z.literal("")),
  submitterEmail: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(160),
  rating: z
    .number()
    .int("Please select a star rating")
    .min(1, "Please select a star rating")
    .max(5),
  title: z
    .string()
    .trim()
    .max(120, "Title is too long")
    .optional()
    .or(z.literal("")),
  body: z
    .string()
    .trim()
    .min(30, "Please write at least a sentence or two (30 characters)")
    .max(2000, "Review is too long — please keep it under 2000 characters"),
  // Product slug rather than id: the form is public and slugs are already public.
  productSlug: z.string().trim().max(120).optional().or(z.literal("")),
  // Present only when the reviewer arrived from an emailed invitation link.
  token: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ReviewSubmission = z.infer<typeof reviewSubmissionSchema>;

export const REVIEW_BODY_MIN = 30;
export const REVIEW_BODY_MAX = 2000;
