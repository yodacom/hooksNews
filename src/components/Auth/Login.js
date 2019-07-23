import React from "react";
import useFormValidation from './useFormValidation';
import validateLogin from "./useFormValidation";
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ''

};


function Login(props) {
  const { handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null)

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      console.log({response})
    } catch (err) {
      console.error('Authention Error', err);
      setFirebaseError(err.message)
    }
  }
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            name="name"
            value={values.name}
          type="text"
          placeholder="Your Name"
          autoComplete="off"
          />
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name="email"
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your Email"
          autoComplete="off"
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && 'error-input'}
          name="password"
          type="password"
          placeholder="Choose a secure password"
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className='error-text'>{firebaseError}</p>}}
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2" disabled={isSubmitting}
          style={{ background: isSubmitting ? "grey" : "orange"}}>
            Submit
          </button>
          <button type="button"
            className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "Need to create an account?" : "Already have an account?"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Login;
