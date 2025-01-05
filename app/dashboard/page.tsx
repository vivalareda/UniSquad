"use client";

import debounce from "lodash/debounce";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreatePostModal } from "@/components/Modal";
import { User, Post, Diploma } from "@prisma/client";
import { useRouter } from "next/navigation";
import PostCard from "@/components/PostCard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((searchQuery) => {
    console.log("Searching for:", searchQuery);
    setSearchQuery(searchQuery);
  }, 500);

  const getRecentPosts = async () => {
    try {
      const response = await fetch("/api/get-recent-posts");

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Received data:", data);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getRecentPosts();
  }, []);

  useEffect(() => {
    if (!user && isLoaded) {
      router.push("/sign-in");
    }
  }, []);

  const handleOnClose = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/get-posts", {
          params: { query: searchQuery },
        });
        const { data } = response;
        console.log("Received data:", data);
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bienvenue, {user?.firstName}!</h1>
          <CreatePostModal onCloseAction={handleOnClose} />
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Recherchez par cours, matière, etc."
                className="pl-10"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b px-4">
            <div className="flex space-x-8">
              <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                Demander recentes
              </button>
              <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                Mes demandes
              </button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.length === 0 && (
              <div className="text-center text-gray-500">
                Aucune demande trouvée, soyez le premier à en créer!
              </div>
            )}
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
