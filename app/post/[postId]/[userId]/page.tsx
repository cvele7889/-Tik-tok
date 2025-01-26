"use client";

import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/Post/Comments";
import CommentsHeader from "@/app/components/Post/CommentsHeader";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { useCommentStore } from "@/app/stores/comment";
import { useLikeStore } from "@/app/stores/like";
import { usePostStore } from "@/app/stores/post";
import { PostPageTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Post({ params }: PostPageTypes) {
  const [unwrappedParams, setUnwrappedParams] = useState<{
    postId: string;
    userId: string;
  } | null>(null);

  const { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  const { setLikesByPost } = useLikeStore();
  const { setCommentsByPost } = useCommentStore();
  const router = useRouter();

  useEffect(() => {
    // Ensure params is a Promise, and resolve it
    if (params && typeof params.then === "function") {
      params.then((unwrappedParams) => {
        setUnwrappedParams(unwrappedParams);
      });
    }
  }, [params]);

  useEffect(() => {
    if (unwrappedParams?.postId && unwrappedParams?.userId) {
      setPostById(unwrappedParams.postId);
      setCommentsByPost(unwrappedParams.postId);
      setLikesByPost(unwrappedParams.postId);
      setPostsByUser(unwrappedParams.userId);
    }
  }, [
    unwrappedParams,
    setPostById,
    setCommentsByPost,
    setLikesByPost,
    setPostsByUser,
  ]);

  const loopTroughPostUp = () => {
    if (!unwrappedParams?.postId || !unwrappedParams?.userId) {
      console.error("Missing postId or userId for navigation");
      return;
    }

    postsByUser.forEach((post) => {
      if (post.id > unwrappedParams.postId) {
        router.push(`/post/${post.id}/${unwrappedParams.userId}`);
      }
    });
  };

  const loopTroughPostDown = () => {
    if (!unwrappedParams?.postId || !unwrappedParams?.userId) {
      console.error("Missing postId or userId for navigation");
      return;
    }

    postsByUser.forEach((post) => {
      if (post.id < unwrappedParams.postId) {
        router.push(`/post/${post.id}/${unwrappedParams.userId}`);
      }
    });
  };

  console.log("unwrappedParams:", unwrappedParams);

  return (
    <div
      id="PostPage"
      className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
    >
      <div className="lg:w-[calc(100%-540px)] h-full relative">
        <Link
          href={`/profile/${unwrappedParams?.userId}`}
          className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
        >
          <AiOutlineClose size="27" />
        </Link>
        <div>
          <button
            onClick={() => loopTroughPostUp()}
            className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronUp size="30" color="#FFFFFF" />
          </button>
          <button
            onClick={() => loopTroughPostDown()}
            className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
          >
            <BiChevronDown size="30" color="#FFFFFF" />
          </button>
        </div>
        <img
          className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
          width="45"
          src="/images/tiktok-logo-small.png"
        />
        <ClientOnly>
          {postById?.video_url ? (
            <video
              className="fixed object-cover w-full my-auto z-[0] h-screen"
              src={useCreateBucketUrl(postById?.video_url)}
            ></video>
          ) : null}
          <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
            {postById?.video_url ? (
              <video
                autoPlay
                controls
                loop
                muted
                className="h-screen mx-auto"
                src={useCreateBucketUrl(postById?.video_url)}
              ></video>
            ) : null}
          </div>
        </ClientOnly>
      </div>
      <div
        id="InfoSection"
        className="lg:max-w-[550px] relative w-full h-full bg-white"
      >
        <div className="py-7" />
        <ClientOnly>
          {postById?.video_url ? (
            <CommentsHeader post={postById} params={unwrappedParams} />
          ) : null}
        </ClientOnly>
        <Comments params={unwrappedParams} />
      </div>
    </div>
  );
}
