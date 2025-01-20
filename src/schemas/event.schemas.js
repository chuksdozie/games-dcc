import * as yup from "yup";

const upcomingEventSchema = yup.object().shape({
  event_name: yup
    .string("Event name must be a string")
    .required("Event name is required"),
  date: yup.date().required("Event Date is required"),
  about_event: yup
    .string()
    .required("About Event is required")
    .min(30, "the description is too short."),
  venue: yup
    .string()
    .required("Venue is required")
    .min(5, "the venue is too short."),
});

export default upcomingEventSchema;
