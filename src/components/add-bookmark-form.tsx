"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { insertBookmarkSchema } from "@/lib/db/schema";
import { createBookmarkAction } from "@/lib/actions/bookmark-actions";
import { Plus } from "lucide-react";
import { z } from "zod";

type FormData = z.infer<typeof insertBookmarkSchema>;

export function AddBookmarkForm() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(insertBookmarkSchema),
    defaultValues: {
      category: "General",
    },
  });

  const { execute, isExecuting } = useAction(createBookmarkAction, {
    onSuccess: () => {
      reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error("Failed to create bookmark:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    execute(data);
  };

  if (!isOpen) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Button onClick={() => setIsOpen(true)} className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Add New Bookmark
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Bookmark</CardTitle>
        <CardDescription>
          Save a new link to your bookmark collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Title *
            </label>
            <Input
              id="title"
              placeholder="Enter bookmark title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="url" className="text-sm font-medium">
              URL *
            </label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              {...register("url")}
            />
            {errors.url && (
              <p className="text-sm text-red-600 mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder="Optional description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium">
              Category *
            </label>
            <Input
              id="category"
              placeholder="e.g., Work, Personal, Learning"
              {...register("category")}
            />
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? "Saving..." : "Save Bookmark"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
