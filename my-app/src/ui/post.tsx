type PostProps = {
  post: {
    id: number;
    title: string;
  };
};

export function Post({ post }: PostProps) {
  return (
    <li>
      <h2>{post.title}</h2>
    </li>
  );
}
