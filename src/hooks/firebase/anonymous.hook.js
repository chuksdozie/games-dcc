import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  anonymousCollectionRef,
  anoPasskeyCollectionRef,
  dbTables,
  upcomingEventCollectionRef,
} from "@/constants/firebaseCollectionRefs";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export const useGetAllAnonymous = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const messagesQuery = query(anonymousCollectionRef, orderBy("date", "asc"));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(updatedData);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  return data;
};

export const useCreateAnonymous = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => addDoc(anonymousCollectionRef, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["all-anonymous"]);
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

export const useUpdateAnonymous = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) =>
      await updateDoc(doc(anonymousCollectionRef, data?.id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["all-anonymous"]);
      },
    }
  );
};
const id = "CA0qfwpLoHZSeYbyaDyq";

export const useGetOneAnoPasskey = () => {
  const querySnapshot = useQuery({
    queryKey: ["passkey", id],
    queryFn: async () => await getDoc(doc(anoPasskeyCollectionRef, id)),
    // enabled: !!forWho,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const data = querySnapshot?.data?.data();
  return data;
};

export const useUpdateAnoPasskey = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => await updateDoc(doc(anoPasskeyCollectionRef, id), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["passkey", id]);
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
