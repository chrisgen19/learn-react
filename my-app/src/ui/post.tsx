import type { Post as PostData } from "@/lib/posts";

type PostProps = {
  post: PostData;
};

export function Post({ post }: PostProps) {
  return (
    <li>
      <h2>{post.title}</h2>
    </li>
  );
}
