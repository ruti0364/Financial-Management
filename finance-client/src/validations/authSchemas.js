import * as yup from "yup";

// התחברות
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("אימייל חובה")
    .email("האימייל לא תקין"),
  password: yup
    .string()
    .required("סיסמה חובה")
    .min(6, "הסיסמה חייבת להיות לפחות 6 תווים"),
});

//הרשמה
export const RegisterSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("שם פרטי חובה")
    .min(2, "לפחות שתי אותיות")
    .matches(/^[א-ת]+$/, "בעברית בלבד"),
  lastName: yup
    .string()
    .required("שם משפחה חובה")
    .min(2, "לפחות שתי אותיות")
    .matches(/^[א-ת]+$/, "בעברית בלבד"),
  email: yup
    .string()
    .required("אימייל חובה")
    .email("האימייל לא תקין"),
  password: yup
    .string()
    .required("סיסמה חובה")
    .min(6, "לפחות 6 תווים"),
});
