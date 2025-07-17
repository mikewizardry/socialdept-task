import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserBookmarks } from "@/lib/actions/bookmark-actions";
import { BookmarkList } from "@/components/bookmark-list";
import { AddBookmarkForm } from "@/components/add-bookmark-form";
import { UserButton } from "@clerk/nextjs";
import { Bookmark } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const bookmarks = await getUserBookmarks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">BookmarkHub</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome back!</span>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Bookmarks
          </h2>
          <p className="text-gray-600">Manage and organize your saved links</p>
        </div>

        {/* Add Bookmark Form */}
        <div className="mb-8">
          <AddBookmarkForm />
        </div>

        {/* Bookmarks List */}
        <BookmarkList bookmarks={bookmarks} />
      </main>
    </div>
  );
}
