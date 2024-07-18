"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

const New = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorSubmit, setErrorSubmit] = React.useState("");
  const [isSuccessPost, setIsSuccessPost] = React.useState(false);

  const onSubmit = (data) => createNewPost(data);

  const createNewPost = async (params) => {
    try {
      const responseNewPosts = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        { ...params, userId: 1 }
      );
      if (responseNewPosts.status === 201) {
        setIsSuccessPost(true);
      }
    } catch (error) {
      setErrorSubmit(error.message);
    }
  };

  return (
    <main className="flex flex-col min-h-screen gap-6 p-24 bg-slate-50 text-neutral-950">
      <Link href="/" className="font-bold ">
        {"< Back"}
      </Link>
      <h1 className="text-3xl font-bold">Add New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* register your input into the hook by invoking the "register" function */}
        <input
          placeholder="Insert post title"
          {...register("title", { required: true })}
          className="p-2 bg-transparent border-2 rounded-lg border-neutral-950"
        />
        {errors.title && (
          <span className="font-bold text-red-500">This field is required</span>
        )}

        {/* include validation with required or other standard HTML validation rules */}
        <textarea
          {...register("body", { required: true })}
          rows={5}
          placeholder="Insert post body"
          className="p-2 bg-transparent border-2 rounded-lg resize-none border-neutral-950"
        />
        {/* errors will return when field validation fails  */}
        {errors.body && (
          <span className="font-bold text-red-500">This field is required</span>
        )}

        <input
          type="submit"
          className="px-6 py-4 font-bold rounded-lg max-w-fit bg-neutral-700 text-slate-50"
        />
        {errorSubmit && (
          <span className="font-bold text-red-500">{errorSubmit}</span>
        )}
        {isSuccessPost && (
          <span className="font-bold text-green-400">
            Post has been created successfully
          </span>
        )}
      </form>
    </main>
  );
};

export default New;
