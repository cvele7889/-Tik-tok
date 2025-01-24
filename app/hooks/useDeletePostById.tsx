import { database, storage } from "@/libs/AppWriteClient";
import useGetLikesByPostId from "./useGetLikesByPostId";
import useDeleteLike from "./useDeleteLike";
import UseGetCommentByPostId from "./useGetCommentByPostId";
import useDeleteComment from "./useDeleteComment";
const useDeletePostId = async (postId: string, currentImage: string) => {
  try {
    const likes = await useGetLikesByPostId(postId);
    likes.forEach(async (like) => {
      await useDeleteLike(like?.id);
    });
    const comments = await UseGetCommentByPostId(postId);
    comments.forEach(async (comment) => {
      await useDeleteComment(comment?.id);
    });
    await database.deleteDocument(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE),
      postId
    );
    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      currentImage
    );
  } catch (error) {
    throw error;
  }
};
export default useDeletePostId;
