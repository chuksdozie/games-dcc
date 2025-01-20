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

const Index = () => {
  const [showError, setShowError] = useState(false);
  const { push, query } = useRouter();
  const data = useGetOneUpcomingEvent(query?.id);
  const { mutate, isLoading } = useUpdateUpcomingEvent(query?.id);
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
        <h2 className="header">Edit Upcoming Event</h2>
        {/* <button>+ Create New</button> */}
      </PageHeader>

      <Formik
        initialValues={{
          ...data,
          date: convertToCustomFormatForDateTime(
            new Timestamp(data?.date?.seconds, data?.date?.nanoseconds).toDate()
          ),
        }}
        validationSchema={upcomingEventSchema}
        enableReinitialize
        // validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          mutate(
            { ...values, date: new Date(values?.date) },
            {
              onSuccess: (res) => {
                push("/dashboard/upcoming-events");
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
              label="Event Name"
              type="text"
              placeholder={"enter event name"}
              onChange={handleChange}
              value={values?.event_name}
              name="event_name"
              error={showError && errors.event_name}
            />
            <BasicInput
              type="datetime-local"
              label="Date and Time"
              placeholder={"select date"}
              onChange={handleChange}
              min={convertToCustomFormatForDateTime(Date.now())}
              // onBlur={props.handleBlur}
              value={values?.date}
              name="date"
              error={showError && errors.date}
            />
            <BasicInput
              type="text"
              label="Venue"
              placeholder={"enter a venue"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values?.venue}
              name="venue"
              error={errors.venue}
            />
            <BasicTextArea
              type="text"
              label="About Event"
              placeholder={"What is the event about?"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values?.about_event}
              name="about_event"
              error={errors.about_event}
            />
            <BasicInput
              type="text"
              label="Theme (if any)"
              placeholder={"enter a theme"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values?.theme}
              name="theme"
              error={errors.theme}
            />
            <BasicArrayInput
              type="text"
              label="Scriptures For Theme"
              placeholder={"enter scriptures"}
              shoot={(e) => {
                if (e.length > 0) {
                  setFieldValue("scripture", e);
                  // console.log({ eee: e });
                }
                // console.log({ the: e });
              }}
              // onBlur={props.handleBlur}
              existingValues={values.scripture}
              name="scripture"
              error={errors.scripture}
            />
            <BasicTextArea
              type="text"
              label="More Details About the Event"
              placeholder={"Give more details about the event like RSVP"}
              onChange={handleChange}
              // onBlur={props.handleBlur}
              value={values?.more_details}
              name="more_details"
              error={errors.more_details}
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
