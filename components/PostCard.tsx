import { Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PostCardProps {
  key: string;
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">
          {post.title} - {post.course}
        </h3>
        <div className="flex flex-col items-end space-y-1 gap-1">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Groupe {post.class}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Need a partner for the final project in {post.course}. Focusing on MERN
        stack...
      </p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Posted {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <Link href={`/user/${post.userId}`}>
          <Button variant="outline" size="sm">
            Voir profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
