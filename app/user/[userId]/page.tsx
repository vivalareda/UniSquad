"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PostCard from "@/components/PostCard";
import { User, Post, Diploma } from "@prisma/client";
import axios from "axios";

interface UserPageProps extends User {
  diplomas: Diploma[];
  posts: Post[];
}

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<UserPageProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/get-user");
        const { user } = response.data;
        setProfile(user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || "Profile not found"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Profile</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{profile.name}</p>
                </div>

                {profile.discordHandle && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Discord
                    </h3>
                    <p className="mt-1">{profile.discordHandle}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Diplomas
                  </h3>
                  <div className="mt-2 space-y-2">
                    {profile.diplomas?.map((diploma: Diploma) => (
                      <div
                        key={diploma.id}
                        className="bg-gray-50 p-3 rounded-md"
                      >
                        <p className="font-medium">{diploma.name}</p>
                        <p className="text-sm text-gray-500">
                          {diploma.school}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/profile/edit")}
                  className="w-full mt-4"
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">My Posts</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.posts?.length === 0 ? (
                    <p className="text-gray-500">No posts yet</p>
                  ) : (
                    profile.posts?.map((post: Post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
