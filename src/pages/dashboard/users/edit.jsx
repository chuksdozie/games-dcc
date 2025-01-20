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
import { useGetOneUser, useUpdateUser } from "@/hooks/firebase/user.hook";
import colors from "@/constants/colors";
import { ayfPositions } from "@/constants/ayfPositions";
import userSchema from "@/schemas/user.schemas";

const Index = () => {
  const [showError, setShowError] = useState(false);
  const { push, query } = useRouter();
  const data = useGetOneUser(query?.id);
  const { mutate, isLoading } = useUpdateUser(query?.id);
  // const [bookList, setBookList] = useState([]);
  // const [selectedBook, setSelectedBook] = useState("Genesis");
  // const [selectedChapter, setSelectedChapter] = useState(1);
  // const [chaptersList, setChaptersList] = useState([]);
  // const [versesList, setVersesList] = useState([]);
  console.log({ data, query });

  //   {
  //     "id": "uKQRDqZU9ZeTBZi0TLbuTVzbHz82", @
  //     "deviceToken": 1234567, @
  //     "phone_number": "08160525401", @
  //     "last_name": "Dozie", @
  //     "password": "12345678", @
  //     "gender": "male", @
  //     "first_name": "Chuks", @
  //     "showDOB": false,
  //     "email": "chuksdozie48@gmail.com", @
  //     "date_of_birth": { @
  //         "seconds": 1827576480,
  //         "nanoseconds": 0
  //     },
  //     "ayf_member": true @
  // }

  // const [details, setDetails] = useState({
  //   book: "",
  //   chapter: "",
  //   verse: "",
  //   date: "",
  // });

  // useEffect(() => {
  //   console.log({ selectedBook, selectedChapter });
  //   const books = getBook();
  //   console.log({ books });
  //   setBookList(books);

  //   async function findChapters() {
  //     const chapters = getChapters(selectedBook ?? "Genesis");
  //     setChaptersList(chapters);

  //     console.log({ chapters, selectedBook });
  //   }

  //   findChapters();
  // }, [selectedBook, selectedChapter]);

  // useEffect(() => {
  //   async function findVerses() {
  //     console.log({
  //       selectedChapterddddd: selectedChapter,
  //       jdsghsd: selectedBook,
  //     });
  //     const verses = await getVerses(
  //       selectedBook ?? "Genesis",
  //       selectedChapter
  //     );
  //     setVersesList(verses);
  //     console.log({ verses });
  //   }
  //   findVerses();
  // }, [selectedBook, selectedChapter, chaptersList]);

  return (
    <Wrapper>
      <PageHeader>
        <h2 className="header">Edit User</h2>
        <h5
          style={{
            backgroundColor: colors.gray200,
            padding: ".3rem .5rem",
            borderRadius: "5px",
          }}
        >
          id: {data?.id}
        </h5>
        <h5
          style={{
            backgroundColor: colors.gray200,
            padding: ".3rem .5rem",
            borderRadius: "5px",
          }}
        >
          device token: {data?.deviceToken}
        </h5>
        {/* <button>+ Create New</button> */}
      </PageHeader>

      <Formik
        initialValues={{
          ...data,
          date_of_birth: convertToCustomFormat(
            new Timestamp(
              data?.date_of_birth?.seconds,
              data?.date_of_birth?.nanoseconds
            ).toDate()
          ),
        }}
        validationSchema={userSchema}
        enableReinitialize
        // validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          console.log({ values });
          mutate(
            { ...values, date_of_birth: new Date(values?.date_of_birth) },
            {
              onSuccess: (res) => {
                push("/dashboard/users");
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
            <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
              <BasicInput
                label="First Name"
                type="text"
                placeholder={"enter first name"}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={showError && errors.first_name}
              />
              <BasicInput
                label="Last Name"
                type="text"
                placeholder={"enter last name"}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={showError && errors.last_name}
              />
            </div>
            <BasicInput
              label="Email Address"
              type="text"
              placeholder={"enter email address"}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={showError && errors.email}
            />
            <BasicInput
              label="Phone Number"
              type="text"
              placeholder={"enter phone number"}
              onChange={handleChange}
              value={values.phone_number}
              name="phone_number"
              error={showError && errors.phone_number}
            />
            <BasicDropdown
              label="Gender"
              options={["female", "male"]}
              value={values?.gender}
              // onChange={(e) => {
              //   console.log({ e: e.target.value });
              //   setFieldValue("book", e.target.value);
              //   setSelectedBook(e.target.value);
              //   setFieldValue("chapter", 1);
              //   setFieldValue("verse", 1);
              //   // setSelectedChapter(1);
              // }}
              error={showError && errors.gender}
            />
            <BasicInput
              type="date"
              label="Date and Time"
              placeholder={"select date"}
              onChange={handleChange}
              // min={convertToCustomFormat(Date.now())}
              // onBlur={props.handleBlur}
              value={values.date_of_birth}
              name="date_of_birth"
              // min={"2023-11-20"}
              error={showError && errors.date_of_birth}
            />
            <label htmlFor="ayf">
              {" "}
              AYF Member
              <input
                type="checkbox"
                checked={values?.ayf_member}
                style={{
                  width: 15,
                  height: 15,
                  margin: "0 .2rem",
                  accentColor: colors.success600,
                }}
              />
            </label>

            <label htmlFor="ayf">
              {" "}
              Show Date Of Birth
              <input
                type="checkbox"
                checked={values?.showDOB}
                style={{
                  width: 15,
                  height: 15,
                  margin: "0 .2rem",
                  accentColor: colors.success600,
                }}
              />
            </label>

            <BasicDropdown
              label="AYF Position"
              options={Object.values(ayfPositions)}
              value={values?.ayf_position}
              onChange={handleChange}
              name="ayf_position"
              // onChange={(e) => {
              //   console.log({ e: e.target.value });
              //   // setFieldValue("book", e.target.value);
              //   // setSelectedBook(e.target.value);
              //   // setFieldValue("chapter", 1);
              //   // setFieldValue("verse", 1);
              //   // setSelectedChapter(1);
              // }}
              error={showError && errors.ayf_position}
            />

            {/* <BasicDropdown
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
            /> */}
            {/* <BasicDropdown
              label="Verse"
              options={versesList}
              value={values?.verse}
              onChange={(e) => {
                console.log({ e: Number(e.target.value) });
                setFieldValue("verse", Number(e.target.value));
                // setSelectedVerse(e.target.value);
              }}
              error={showError && errors.verse}
            /> */}
            {/* <BasicInput
              label="Title"
              type="text"
              placeholder={"enter bible study title"}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={showError && errors.title}
            /> */}

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
