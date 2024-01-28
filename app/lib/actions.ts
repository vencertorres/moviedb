"use server";

import { user, watchlist } from "@/db/schema";
import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { get } from "./api";
import { auth, insertUserSchema, signIn } from "./auth";
import { db } from "./db";

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = insertUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(user).values({
      email: validatedFields.data.email,
      password: await bcrypt.hash(validatedFields.data.password, 10),
    });
  } catch (error) {
    return {
      errors: {
        email: ["Email already exists"],
      },
    };
  }

  redirect("/login");
}

export async function logIn(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Incorrect email or password";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const insertMovieSchema = createInsertSchema(watchlist, {
  movieId: z.coerce.number(),
  userId: z.coerce.number(),
});

export async function add(formData: FormData) {
  const session = await auth();

  const validatedFields = insertMovieSchema.safeParse({
    movieId: formData.get("movie_id"),
    userId: session?.user?.id,
  });

  if (!validatedFields.success) {
    return "Invalid request";
  }

  await db.insert(watchlist).values(validatedFields.data);

  revalidatePath(`/movies/${validatedFields.data.movieId}`);
}

export async function remove(formData: FormData) {
  const session = await auth();

  const validatedFields = insertMovieSchema.safeParse({
    movieId: formData.get("movie_id"),
    userId: session?.user?.id,
  });

  if (!validatedFields.success) {
    return "Invalid request";
  }

  await db
    .delete(watchlist)
    .where(
      and(
        eq(watchlist.movieId, validatedFields.data.movieId),
        eq(watchlist.userId, validatedFields.data.userId),
      ),
    );

  revalidatePath(`/movies/${validatedFields.data.movieId}`);
}

export async function results(endpoint: string, page: number) {
  return await get(endpoint, { page: String(page) });
}
