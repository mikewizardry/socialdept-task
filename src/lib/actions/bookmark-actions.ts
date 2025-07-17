"use server";

import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { bookmarks, insertBookmarkSchema } from "@/lib/db/schema";
import { z } from "zod";

// Create base action client
const actionClient = createSafeActionClient();

// Create authenticated action client
const authActionClient = actionClient.use(async ({ next }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return next({ ctx: { userId } });
});

// Create bookmark action
export const createBookmarkAction = authActionClient
  .schema(insertBookmarkSchema)
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      const [bookmark] = await db
        .insert(bookmarks)
        .values({
          ...data,
          userId,
        })
        .returning();

      revalidatePath("/dashboard");
      return { success: true, bookmark };
    } catch (error) {
      throw new Error("Failed to create bookmark");
    }
  });

// Update bookmark action
const updateBookmarkSchema = insertBookmarkSchema.extend({
  id: z.number().positive(),
});

export const updateBookmarkAction = authActionClient
  .schema(updateBookmarkSchema)
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    const { id, ...updateData } = data;

    try {
      const [bookmark] = await db
        .update(bookmarks)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)))
        .returning();

      if (!bookmark) {
        throw new Error("Bookmark not found");
      }

      revalidatePath("/dashboard");
      return { success: true, bookmark };
    } catch (error) {
      throw new Error("Failed to update bookmark");
    }
  });

// Delete bookmark action
const deleteBookmarkSchema = z.object({
  id: z.number().positive(),
});

export const deleteBookmarkAction = authActionClient
  .schema(deleteBookmarkSchema)
  .action(async ({ parsedInput: data, ctx: { userId } }) => {
    try {
      const [deletedBookmark] = await db
        .delete(bookmarks)
        .where(and(eq(bookmarks.id, data.id), eq(bookmarks.userId, userId)))
        .returning();

      if (!deletedBookmark) {
        throw new Error("Bookmark not found");
      }

      revalidatePath("/dashboard");
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete bookmark");
    }
  });

// Get user bookmarks
export async function getUserBookmarks() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const userBookmarks = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt));

    return userBookmarks;
  } catch (error) {
    console.error("Failed to fetch bookmarks:", error);
    return [];
  }
}
