import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bibleStudyCollectionRef,
  dbTables,
  upcomingEventCollectionRef,
} from "@/constants/firebaseCollectionRefs";

export const useGetAllBibleStudy = () => {
  const querySnapshot = useQuery({
    queryKey: ["all-bible-studies"],
    queryFn: async () => await getDocs(bibleStudyCollectionRef),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const useCreateBibleStudy = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addDoc(bibleStudyCollectionRef, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["all-bible-studies"]);
    },
  });
};

export const useGetOneBibleStudy = (id) => {
  const querySnapshot = useQuery({
    queryKey: ["bible-study", id],
    queryFn: async () => await getDoc(doc(bibleStudyCollectionRef, id)),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.data();
  return data;
};

export const useUpdateBibleStudy = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await updateDoc(doc(bibleStudyCollectionRef, id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all-bible-studies"]);
      },
    }
  );
};

export const useDeleteBibleStudy = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await deleteDoc(doc(bibleStudyCollectionRef, data?.id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all-bible-studies"]);
      },
    }
  );
};
