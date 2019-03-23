import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { AddUserQuery } from "./Queries/AddUserQuery";

//Assests
import "../Assets/css/User/UserProfile.css";

const ProfileShema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  receiveEmails: Yup.boolean()
});

const UpdateEmailPref = props => (
  <Mutation mutation={AddUserQuery}>
    {(updateUser, { loading, error, data }) => (
      <div className="userProfile">
        <div className="userform">
          <h5>Set your your email preferences</h5>
          {loading && console.log(props.currentuser.receiveEmails)}
          {error && console.log(error.message)}
          {data && data.updateUser && alert("Email Preferences Set")}
          <Formik
            initialValues={{
              receiveEmails: props.currentuser.receiveEmails,
              email: props.currentuser.email
            }}
            validationSchema={ProfileShema}
            onSubmit={values => {
              updateUser({
                variables: {
                  user: {
                    receiveEmails: values.receiveEmails,
                    email: values.email
                  }
                }
              });
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="userFormGroup">
                  <label>Email:</label>
                  <input
                    type="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {touched.email && errors && errors.email && (
                    <div className="userFormErrorBlock">{errors.email}</div>
                  )}
                </div>
                <div className="userFormGroup">
                  <label>Receive Emails:</label>
                  <input
                    type="Checkbox"
                    name="receiveEmails"
                    value={values.receiveEmails}
                  />{" "}
                </div>

                <div className="user-submit-block">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    )}
  </Mutation>
);

export default UpdateEmailPref;
