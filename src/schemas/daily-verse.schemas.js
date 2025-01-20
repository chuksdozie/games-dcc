import * as yup from "yup";

const verseForTodaySchema = yup.object().shape({
  book: yup
    .string("Bible book must be a string")
    .required("Bible book is required"),
  chapter: yup
    .string("Bible chapter must be a string")
    .required("Bible chapter is required"),
  verse: yup
    .string("Bible verse must be a string")
    .required("Bible verse is required"),
  date: yup.date().required("Verse date is required"),
});

export default verseForTodaySchema;
