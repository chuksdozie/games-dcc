import * as yup from "yup";

const userSchema = yup.object().shape({
  //   {
  //     "id": "uKQRDqZU9ZeTBZi0TLbuTVzbHz82", @@
  //     "deviceToken": 1234567, @
  //     "phone_number": "08160525401", @@
  //     "last_name": "Dozie", @@
  //     "password": "12345678", @
  //     "gender": "male", @@
  //     "first_name": "Chuks", @@
  //     "showDOB": false,
  //     "email": "chuksdozie48@gmail.com", @@
  //     "date_of_birth": { @@
  //         "seconds": 1827576480,
  //         "nanoseconds": 0
  //     },
  //     "ayf_member": true @
  // }
  id: yup.string("Id must be a string").required("Id is required"),
  phone_number: yup
    .string("Phone number must be a string")
    .required("Phone number is required"),
  last_name: yup
    .string("Last name must be a string")
    .required("Last name is required"),
  first_name: yup
    .string("First name must be a string")
    .required("First name is required"),
  email: yup.string("Email must be a string").required("Email is required"),
  date_of_birth: yup.date().required("Date of birth is required"),
  gender: yup.string("Gender must be a string").required("Gender is required"),
});

export default userSchema;
