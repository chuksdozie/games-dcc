import React, { useState } from "react";
import { Formik } from "formik";
import DefaultTable from "@/components/table/DefaultTable";
import { PageHeader, Wrapper } from "..";
import {
  useCreateUpcomingEvent,
  useGetAllUpcomingEvents,
} from "@/hooks/firebase/upcoming-event.hook";
import {
  eventColumns,
  upcomingEventColumns,
} from "@/constants/tableColumns/upcomingEvent.column";
import BasicInput from "@/components/inputs/BasicInput";
import BasicForm from "@/components/inputs/BasicForm";
import BasicTextArea from "@/components/inputs/BasicTextArea";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import upcomingEventSchema from "@/schemas/event.schemas";
import BasicArrayInput from "@/components/inputs/BasicArrayInput";
import { useRouter } from "next/router";
import { convertToCustomFormatForDateTime } from "@/utils/dateFunctions";
import { useCreateBibleStudy } from "@/hooks/firebase/bible-study.hook";
import bibleStudySchema from "@/schemas/bible-study.schemas";

const Index = () => {
  const { mutate } = useCreateBibleStudy();
  const [showError, setShowError] = useState(false);
  const { push } = useRouter();
  const [details, setDetails] = useState({
    aim: "God's Love For Man. ishgfjvhsgdc dgjfvcdsf cdgjufvcd zbcgsdujzfvc dsgjzfucd dcgaduscjasfx",
    date: null,
    conclusion:
      "uif ejwhefdvjenw fd ewrgkmwe dwkerw reugiwer kdhvs hsfsv ahsfk",
    introduction:
      "uif ejwhefdvjenw fd ewrgkmwe dwkerw reugiwer kdhvs hsfsv ahsfk",
    main_scriptures: ["james 6 : 7 - 9", "romans 17 : 4 - 9"],
    memory_verse:
      "John 3:17 - hbdikfcs vc ajgscx nsjgicams cgsjax ascxa Cjszdyc aczhkakZCx ashaksdakdks dcagsidvyasdh",
    questions: [
      {
        question: "ghf fghv hfgjf hfghj",
        scriptures: ["matthew 3:1-9", "colossians 7: 9-16"],
      },
    ],
    title: "God's Mercy",
  });

  return (
    <Wrapper>
      <PageHeader>
        <h2 className="header">New Bible Study</h2>
        {/* <button>+ Create New</button> */}
      </PageHeader>

      <Formik
        initialValues={details}
        validationSchema={bibleStudySchema}
        // validateOnBlur={true}
        validateOnChange={true}
        // onSubmit={(values, actions) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     actions.setSubmitting(false);
        //   }, 1000);
        // }}
        onSubmit={(values, actions) => {
          mutate(
            { ...values, date: new Date(values?.date) },
            {
              onSuccess: (res) => {
                console.log({ res });
                push("/dashboard/bible-study");
              },
              onError: (err) => {
                console.log({ err });
              },
            }
          );
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <BasicForm>
            {/* 
    
    questions: [
      {
        question: "ghf fghv hfgjf hfghj",
        scriptures: ["matthew 3:1-9", "colossians 7: 9-16"],
      },
    ], */}
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
                // if (errors) {
                //   console.log({ errors });
                //   setError(errors);
                //   return;
                // }
                // setError({});
              }}
            />
            {/* <button type="submit">Submit</button> */}
          </BasicForm>
        )}
      </Formik>
    </Wrapper>
  );
};
export default Index;
