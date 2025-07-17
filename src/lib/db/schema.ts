import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull().default("General"),
  userId: varchar("user_id", { length: 255 }).notNull(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 7 }).notNull().default("#3B82F6"),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Pure Zod schemas for validation
export const insertBookmarkSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().max(500, "Description too long").optional(),
  category: z.string().min(1, "Category is required"),
  isPublic: z.boolean().optional(),
});

export const selectBookmarkSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  userId: z.string(),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const insertCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Name too long"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color"),
});

export const selectCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

// Type definitions
export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
