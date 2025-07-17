import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, Shield, Zap } from "lucide-react";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bookmark className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">BookmarkHub</h1>
        </div>

        <div className="flex items-center space-x-4">
          {userId ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Get Started</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Organize Your <span className="text-blue-600">Bookmarks</span> Like
            Never Before
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern, secure, and lightning-fast bookmark manager built with the
            latest technologies. Keep your links organized, accessible, and
            synced across all devices.
          </p>

          {!userId && (
            <div className="flex items-center justify-center space-x-4">
              <SignUpButton>
                <Button size="lg" className="px-8">
                  Start Organizing Now
                </Button>
              </SignUpButton>
              <SignInButton>
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </SignInButton>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-blue-600" />
                <span>Lightning Fast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Next.js 15 and modern technologies for the fastest
                possible experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-600" />
                <span>Secure & Private</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your bookmarks are encrypted and secure with Clerk
                authentication and modern security practices.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bookmark className="h-6 w-6 text-purple-600" />
                <span>Smart Organization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize your bookmarks with categories, search functionality,
                and intuitive management tools.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 mt-20">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 BookmarkHub. Built with ❤️ using the T3 Stack.</p>
        </div>
      </footer>
    </div>
  );
}
