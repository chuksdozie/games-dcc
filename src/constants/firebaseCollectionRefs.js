import { app } from "@/config/firebase";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export const dbTables = {
  users: "users",
  bible_study: "bible_study",
  upcoming_event: "upcoming_event",
  feedback: "feedback",
  people: "people",
  verse_for_today: "verse_for_today",
  anonymous: "anonymous",
  ano_passkey: "ano-password",
};

export const upcomingEventCollectionRef = collection(
  db,
  dbTables.upcoming_event
);
export const verseForTodayCollectionRef = collection(
  db,
  dbTables.verse_for_today
);
export const bibleStudyCollectionRef = collection(db, dbTables.bible_study);
export const peopleCollectionRef = collection(db, dbTables.people);
export const userCollectionRef = collection(db, dbTables.users);
export const anonymousCollectionRef = collection(db, dbTables.anonymous);
export const anoPasskeyCollectionRef = collection(db, dbTables.ano_passkey);
