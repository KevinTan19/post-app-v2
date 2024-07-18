"use client";
import React from "react";
import PostCard from "../../components/post-card";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import useFetchData from "../../hooks/useFetchData";

export default function Home() {
  // const [posts, setPosts] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const { data: posts } = useFetchData();
  React.useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const searchPosts = () => {
    const temp = posts.filter((post) => post.title.includes(search));
    setFilteredPosts(temp);
  };

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [filteredPosts]);

  return (
    <main className="flex flex-col min-h-screen gap-12 p-24 bg-slate-50 text-neutral-950">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-center">Post App v2</h1>
        <Link href="/new" className="self-end">
          <button className="px-6 py-4 font-bold rounded-lg max-w-fit bg-sky-500 text-slate-50">
            + Add
          </button>
        </Link>
        <div className="flex justify-center w-full gap-x-4">
          <input
            placeholder="Search post"
            className="w-2/3 p-4 bg-transparent border-2 rounded-lg border-neutral-950"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-6 py-4 font-bold rounded-lg max-w-fit bg-neutral-700 text-slate-50"
            onClick={() => searchPosts()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        {isLoading ? (
          <MoonLoader />
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-4">
              {filteredPosts.map((post) => {
                return <PostCard key={post.id} data={post} />;
              })}
            </div>
          </>
        ) : (
          <span className="self-center font-bold">
            No post matching your search
          </span>
        )}
      </div>
    </main>
  );
}
