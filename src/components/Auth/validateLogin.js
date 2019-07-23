import { onErrorResumeNext } from "rxjs";

export default function validateLogin(values) {
  let errors = {}

  // email errors
  if (!values.email) {
    errors.email = "Email required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) {
    error.email = "Invalid email address"
  }

  // Password errors
  if (!values.password) {
    errors.password =  "Password Required"
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 Characters"
  }

  return errors;
}
