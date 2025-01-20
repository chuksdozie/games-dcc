import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { PageHeader, Wrapper } from "..";
import {
  useGetOneUpcomingEvent,
  useUpdateUpcomingEvent,
} from "@/hooks/firebase/upcoming-event.hook";
import BasicInput from "@/components/inputs/BasicInput";
import BasicForm from "@/components/inputs/BasicForm";
import BasicTextArea from "@/components/inputs/BasicTextArea";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import upcomingEventSchema from "@/schemas/event.schemas";
import BasicArrayInput from "@/components/inputs/BasicArrayInput";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
import {
  convertToCustomFormat,
  convertToCustomFormatForDateTime,
} from "@/utils/dateFunctions";
import BasicDropdown from "@/components/inputs/BasicDropdown";
import {
  useGetOneVerseForToday,
  useUpdateVerseForToday,
} from "@/hooks/firebase/verse-for-today.hook";
import { getBook, getChapters, getVerses } from "@/utils/bibleLogic";
import verseForTodaySchema from "@/schemas/daily-verse.schemas";

const Index = () => {
  const [showError, setShowError] = useState(false);
  const { push, query } = useRouter();
  const data = useGetOneVerseForToday(query?.id);
  const { mutate, isLoading } = useUpdateVerseForToday(query?.id);
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [chaptersList, setChaptersList] = useState([]);
  const [versesList, setVersesList] = useState([]);
  console.log({ data });

  const [details, setDetails] = useState({
    book: "",
    chapter: "",
    verse: "",
    date: "",
  });

  useEffect(() => {
    console.log({ selectedBook, selectedChapter });
    const books = getBook();
    console.log({ books });
    setBookList(books);

    async function findChapters() {
      const chapters = getChapters(selectedBook ?? "Genesis");
      setChaptersList(chapters);

      console.log({ chapters, selectedBook });
    }

    findChapters();
  }, [selectedBook, selectedChapter]);

  useEffect(() => {
    async function findVerses() {
      console.log({
        selectedChapterddddd: selectedChapter,
        jdsghsd: selectedBook,
      });
      const verses = await getVerses(
        selectedBook ?? "Genesis",
        selectedChapter
      );
      setVersesList(verses);
      console.log({ verses });
    }
    findVerses();
  }, [selectedBook, selectedChapter, chaptersList]);

  return (
    <Wrapper>
      <PageHeader>
        <h2 className="header">Edit Upcoming Event</h2>
        {/* <button>+ Create New</button> */}
      </PageHeader>

      <Formik
        initialValues={{
          ...data,
          date: convertToCustomFormat(
            new Timestamp(data?.date?.seconds, data?.date?.nanoseconds).toDate()
          ),
        }}
        validationSchema={verseForTodaySchema}
        enableReinitialize
        // validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          console.log({ values });
          mutate(
            { ...values, date: new Date(values?.date) },
            {
              onSuccess: (res) => {
                push("/dashboard/verse-for-today");
                return res;
              },
              onError: (err) => {
                console.log({ err });
                return err;
              },
            }
          );
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <BasicForm>
            <BasicInput
              type="date"
              label="Date and Time"
              placeholder={"select date"}
              onChange={handleChange}
              min={convertToCustomFormat(Date.now())}
              // onBlur={props.handleBlur}
              value={values.date}
              name="date"
              // min={"2023-11-20"}
              error={showError && errors.date}
            />
            <BasicDropdown
              label="Book"
              options={bookList}
              value={values?.book}
              onChange={(e) => {
                console.log({ e: e.target.value });
                setFieldValue("book", e.target.value);
                setSelectedBook(e.target.value);
                setFieldValue("chapter", 1);
                setFieldValue("verse", 1);
                // setSelectedChapter(1);
              }}
              error={showError && errors.book}
            />
            <BasicDropdown
              label="Chapter"
              options={chaptersList}
              value={values?.chapter}
              onChange={(e) => {
                console.log({ e: e.target.value });
                setFieldValue("chapter", Number(e.target.value));
                setSelectedChapter(Number(e.target.value));
                setFieldValue("verse", 1);
                // setSelectedVers(1)
              }}
              error={showError && errors.chapter}
            />
            <BasicDropdown
              label="Verse"
              options={versesList}
              value={values?.verse}
              onChange={(e) => {
                console.log({ e: Number(e.target.value) });
                setFieldValue("verse", Number(e.target.value));
                // setSelectedVerse(e.target.value);
              }}
              error={showError && errors.verse}
            />

            <PrimaryButton
              width={"50px"}
              loading={isLoading}
              onClick={() => {
                const hasError =
                  errors?.date ||
                  errors?.book ||
                  errors?.chapter ||
                  errors?.verse;
                console.log(3434);

                if (hasError) {
                  console.log({ hasError });
                  return setShowError(true);
                }
                handleSubmit();
                // if (errors) {
                //   console.log({ errors });
                //   setError(errors);
                //   return;
                // }
                // setError({});
              }}
            />
          </BasicForm>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Index;
