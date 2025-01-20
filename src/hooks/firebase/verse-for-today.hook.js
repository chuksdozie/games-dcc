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
  dbTables,
  verseForTodayCollectionRef,
} from "@/constants/firebaseCollectionRefs";

export const useGetAllDailyVerses = () => {
  const querySnapshot = useQuery({
    queryKey: ["daily-verses"],
    queryFn: async () => await getDocs(verseForTodayCollectionRef),
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

export const useCreateVerseForToday = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addDoc(verseForTodayCollectionRef, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["daily-verses"]);
    },
  });
};

export const useGetOneVerseForToday = (id) => {
  const querySnapshot = useQuery({
    queryKey: ["verse-for-today", id],
    queryFn: async () => await getDoc(doc(verseForTodayCollectionRef, id)),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.data();
  return data;
};

export const useUpdateVerseForToday = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await updateDoc(doc(verseForTodayCollectionRef, id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["daily-verses"]);
      },
    }
  );
};

export const useDeleteVerseForToday = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await deleteDoc(doc(verseForTodayCollectionRef, data?.id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["daily-verses"]);
      },
    }
  );
};
