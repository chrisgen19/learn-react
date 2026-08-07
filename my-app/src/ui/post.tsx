import Link from "next/link";
import type { Post as PostData } from "@/lib/posts";

type PostProps = {
  post: PostData;
};

export function Post({ post }: PostProps) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
    </li>
  );
}
