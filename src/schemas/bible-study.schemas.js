import * as yup from "yup";

const bibleStudySchema = yup.object().shape({
  aim: yup.string("Aim must be a string").required("Aim is required"),
  title: yup.string("Title must be a string").required("Title is required"),
  introduction: yup
    .string("Introduction must be a string")
    .required("Introduction is required"),
  memory_verse: yup
    .string("Memory Verse must be a string")
    .required("Memory Verse is required"),
  date: yup.date().required("Study Date is required"),
  conclusion: yup
    .string("Conclusion must be a string")
    .required("Conclusion is required"),

  // aim: yup
  //   .string()
  //   .required("About Event is required")
  //   .min(30, "the description is too short."),

  /** */

  // main_scriptures: ["james 6 : 7 - 9", "romans 17 : 4 - 9"],

  // questions: [
  //   {
  //     question: "ghf fghv hfgjf hfghj",
  //     scriptures: ["matthew 3:1-9", "colossians 7: 9-16"],
  //   },
  // ],
});

export default bibleStudySchema;
