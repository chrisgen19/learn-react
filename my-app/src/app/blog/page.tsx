import { getPosts } from "@/lib/posts";
import { Post } from "@/ui/post";

function resolveAfter2Seconds() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
  return result;
}

export default async function Page() {
  const posts = await getPosts();
  const message = await asyncCall();

  return (
    <div>
      <p>{message}</p>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
