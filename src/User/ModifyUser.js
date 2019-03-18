import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { AddUserQuery } from "./Queries/AddUserQuery";

//Assests
import "../Assets/css/User/UserProfile.css";

const ProfileShema = Yup.object().shape({
  handle: Yup.string()
    .min(5, "Must be 5 characters or longer")
    .max(20, "Must be 20 characters or less")
    .required("Handle is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  receiveEmails: Yup.boolean()
});

const AddUser = () => (
  <Mutation mutation={AddUserQuery}>
    {(updateUser, { loading, error, data }) => (
      <div className="userProfile">
        <div className="userform">
          <h5>Set your StaplePuck user handle</h5>
          {loading && console.log(loading)}
          {error && console.log(error)}
          {data && data.updateUser && alert("Update Success")}
          <Formik
            initialValues={{
              handle: "",
              email: "",
              receiveEmails: false
            }}
            validationSchema={ProfileShema}
            onSubmit={values => {
              updateUser({
                variables: {
                  user: {
                    email: values.email,
                    name: values.handle,
                    receiveEmails: values.receiveEmails
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
                  <label>Handle:</label>
                  <input
                    type="Text"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.handle}
                  />
                  {touched.handle && errors && errors.handle && (
                    <div className="userFormErrorBlock">{errors.handle}</div>
                  )}
                </div>

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
                <div>
                  Your hanlde will be associated with each team you create.
                  <br />
                  Your team names will be set when you create a team.
                </div>
              </form>
            )}
          />
        </div>
      </div>
    )}
  </Mutation>
);

export default AddUser;
