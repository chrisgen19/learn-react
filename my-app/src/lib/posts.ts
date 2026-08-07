export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
};

export async function getPosts(): Promise<Post[]> {
  return [
    { id: 1, title: "Learning React", slug: "learning-react", content: "Learning React is fun" },
    { id: 2, title: "Learning Next.js", slug: "learning-nextjs", content: "Learning Next.js is fun" },
    { id: 3, title: "Learning Tailwind CSS", slug: "learning-tailwind-css", content: "Learning Tailwind CSS is fun" },
    { id: 4, title: "Learning TypeScript", slug: "learning-typescript", content: "Learning TypeScript is fun" },
    { id: 5, title: "Learning JavaScript", slug: "learning-javascript", content: "Learning JavaScript is fun" },
    { id: 6, title: "Learning HTML", slug: "learning-html", content: "Learning HTML is fun" },
    { id: 7, title: "Learning CSS", slug: "learning-css", content: "Learning CSS is fun" },
    { id: 8, title: "Learning Git", slug: "learning-git", content: "Learning Git is fun" },
    { id: 9, title: "Learning GitHub", slug: "learning-github", content: "Learning GitHub is fun" },
    { id: 10, title: "Learning Docker", slug: "learning-docker", content: "Learning Docker is fun" },
    { id: 11, title: "Learning Kubernetes", slug: "learning-kubernetes", content: "Learning Kubernetes is fun" },
  ] as Post[];
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
