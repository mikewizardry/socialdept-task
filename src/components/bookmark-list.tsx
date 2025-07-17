"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteBookmarkAction } from "@/lib/actions/bookmark-actions";
import { ExternalLink, Trash2, Calendar } from "lucide-react";
import type { Bookmark } from "@/lib/db/schema";

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { execute: deleteBookmark } = useAction(deleteBookmarkAction, {
    onSuccess: () => {
      setDeletingId(null);
    },
    onError: (error) => {
      console.error("Failed to delete bookmark:", error);
      setDeletingId(null);
    },
  });

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deleteBookmark({ id });
  };

  if (bookmarks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ExternalLink className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-600">
              Start by adding your first bookmark using the form above.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                  >
                    <span>{bookmark.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardTitle>
                {bookmark.description && (
                  <CardDescription className="mt-2">
                    {bookmark.description}
                  </CardDescription>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(bookmark.id)}
                disabled={deletingId === bookmark.id}
                className="text-red-600 hover:text-red-800"
              >
                {deletingId === bookmark.id ? (
                  "Deleting..."
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {bookmark.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(bookmark.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 truncate max-w-xs"
              >
                {bookmark.url}
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
