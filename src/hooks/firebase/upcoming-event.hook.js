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
  upcomingEventCollectionRef,
} from "@/constants/firebaseCollectionRefs";

export const useGetAllUpcomingEvents = () => {
  const querySnapshot = useQuery({
    queryKey: ["all-upcoming-events"],
    queryFn: async () => await getDocs(upcomingEventCollectionRef),
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

export const useCreateUpcomingEvent = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addDoc(upcomingEventCollectionRef, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["all-upcoming-events"]);
    },
  });
};

export const useGetOneUpcomingEvent = (id) => {
  const querySnapshot = useQuery({
    queryKey: ["upcoming-event", id],
    queryFn: async () => await getDoc(doc(upcomingEventCollectionRef, id)),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.data();
  return data;
};

export const useUpdateUpcomingEvent = (id) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await updateDoc(doc(upcomingEventCollectionRef, id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all-upcoming-events"]);
      },
    }
  );
};

export const useDeleteUpcomingEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => await deleteDoc(doc(upcomingEventCollectionRef, data?.id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all-upcoming-events"]);
      },
    }
  );
};
