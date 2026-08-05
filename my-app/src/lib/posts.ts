export type Post = {
  id: number;
  title: string;
};

export async function getPosts(): Promise<Post[]> {
  return [
    { id: 1, title: "Learning React" },
    { id: 2, title: "Learning Next.js" },
    { id: 3, title: "Learning Tailwind CSS" },
    { id: 4, title: "Learning TypeScript" },
    { id: 5, title: "Learning JavaScript" },
    { id: 6, title: "Learning HTML" },
    { id: 7, title: "Learning CSS" },
    { id: 8, title: "Learning Git" },
    { id: 9, title: "Learning GitHub" },
    { id: 10, title: "Learning Docker" },
    { id: 11, title: "Learning Kubernetes" },
  ];
}
