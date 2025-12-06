import * as Yup from "yup";

const phoneRegexp =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "FullName: 2 symbols minimum")
    .required("FullName: FullName required"),
  email: Yup.string()
    .email("Email: Invalid email")
    .required("Email: Email required"),
  phone: Yup.string()
    .required("Phone: Phone required")
    .matches(phoneRegexp, "Phone: Incorrect phone number"),
  role: Yup.string().required("Role: Role required"),
});
