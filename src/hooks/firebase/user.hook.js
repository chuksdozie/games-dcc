import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userCollectionRef } from "@/constants/firebaseCollectionRefs";

export const useGetAllUsers = () => {
  const querySnapshot = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getDocs(userCollectionRef),
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

export const useGetOneUser = (id) => {
  const querySnapshot = useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getDoc(doc(userCollectionRef, id)),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.data();
  return data;
};

export const useUpdateUser = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await updateDoc(doc(userCollectionRef, id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
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
