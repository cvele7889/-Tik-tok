import { database, Query } from "@/libs/AppWriteClient";
const useGetProfileByUserId = async (userId: string) => {
  try {
    const response = await database.listDocuments(
      String(process.env.NEXT_PUBLIC_DATABASE_ID),
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [Query.equal("user_id", userId)]
    );
    const document = response.documents;
    return {
      id: document[0]?.$id,
      user_id: document[0]?.$user_id,
      name: document[0]?.$name,
      image: document[0]?.$image,
      bio: document[0]?.$bio,
    };
  } catch (error) {
    throw error;
  }
};
export default useGetProfileByUserId;
