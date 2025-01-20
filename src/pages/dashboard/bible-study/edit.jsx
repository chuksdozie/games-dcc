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
import { convertToCustomFormatForDateTime } from "@/utils/dateFunctions";
import {
  useGetOneBibleStudy,
  useUpdateBibleStudy,
} from "@/hooks/firebase/bible-study.hook";
import bibleStudySchema from "@/schemas/bible-study.schemas";

const Index = () => {
  const [showError, setShowError] = useState(false);
  const { push, query } = useRouter();
  const data = useGetOneBibleStudy(query?.id);
  const { mutate, isLoading } = useUpdateBibleStudy(query?.id);
  const [details, setDetails] = useState(
    {
      ...data,
      date: new Timestamp(
        data?.date?.seconds,
        data?.date?.nanoseconds
      ).toDate(),
    } ?? {
      about_event: "",
      date: null,
      event_name: "",
      more_details: "",
      scripture: [],
      theme: "",
      venue: "",
    }
  );

  return (
    <Wrapper>
      <PageHeader>
        <h2 className="header">Edit Bible Study</h2>
        {/* <button>+ Create New</button> */}
      </PageHeader>

      <Formik
        initialValues={{
          ...data,
          date: convertToCustomFormatForDateTime(
            new Timestamp(data?.date?.seconds, data?.date?.nanoseconds).toDate()
          ),
        }}
        validationSchema={bibleStudySchema}
        enableReinitialize
        // validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          mutate(
            { ...values, date: new Date(values?.date) },
            {
              onSuccess: (res) => {
                push("/dashboard/bible-study");
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
              label="Title"
              type="text"
              placeholder={"enter bible study title"}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={showError && errors.title}
            />
            <BasicInput
              label="Aim"
              type="text"
              placeholder={"enter bible study aim"}
              onChange={handleChange}
              value={values.aim}
              name="aim"
              error={showError && errors.aim}
            />
            <BasicTextArea
              type="text"
              label="Introduction"
              placeholder={"Study introduction"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values.introduction}
              name="introduction"
              error={errors.introduction}
            />
            <BasicArrayInput
              type="text"
              label="Scriptures"
              placeholder={"enter scriptures"}
              shoot={(e) => {
                if (e.length > 0) {
                  console.log({ eee: e });
                  setFieldValue("main_scriptures", e);
                }
                // console.log({ the: e });
              }}
              // onBlur={props.handleBlur}
              value={values.main_scriptures}
              name="main_scriptures"
              error={errors.main_scriptures}
            />
            <BasicInput
              label="Memory verse"
              type="text"
              placeholder={"enter bible memory verse"}
              onChange={handleChange}
              value={values.memory_verse}
              name="memory_verse"
              error={showError && errors.memory_verse}
            />
            <BasicInput
              type="datetime-local"
              label="Date and Time"
              placeholder={"select date"}
              onChange={handleChange}
              min={convertToCustomFormatForDateTime(Date.now())}
              // onBlur={props.handleBlur}
              value={values.date}
              name="date"
              error={showError && errors.date}
            />

            <BasicTextArea
              type="text"
              label="Study conclusion"
              placeholder={"Study conclusion"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values.conclusion}
              name="conclusion"
              error={errors.conclusion}
            />
            <PrimaryButton
              width={"50px"}
              loading={isLoading}
              onClick={() => {
                const hasError =
                  errors?.event_name ||
                  errors?.date ||
                  errors?.venue ||
                  errors?.theme ||
                  errors?.about_event ||
                  errors?.scripture ||
                  errors?.more_details;
                console.log(3434);

                if (hasError) {
                  console.log({ hasError });
                  return setShowError(true);
                }
                handleSubmit();
              }}
            />
          </BasicForm>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Index;
