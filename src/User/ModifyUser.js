import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { AddUserQuery } from "./Queries/AddUserQuery";

//Assests
import "../Assets/css/UserProfile.css";
import Logo from "../Assets/Images/logo-white-with-name.jpg";

const ProfileShema = Yup.object().shape({
  handle: Yup.string()
    .min(5, "Must be 5 characters or longer")
    .max(20, "Must be 20 characters or less")
    .required("Handle is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required")
});

const userAddWithSuccess = onUserAddSuccess => {
  alert("Update success");
};

const AddUser = ({ onUserAddSuccess }) => (
  <Mutation mutation={AddUserQuery}>
    {(updateUser, { loading, error, data }) => (
      <div className="userProfile">
        <img className="mainLogo" src={Logo} alt="Logo" />
        <h3>Set your StaplePuck user handle</h3>

        {/* {loading && null}
        {error && null} */}
        {data && data.updateUser && userAddWithSuccess(onUserAddSuccess)}
        <Formik
          initialValues={{
            handle: "",
            email: ""
          }}
          validationSchema={ProfileShema}
          onSubmit={values => {
            // log submit status
            updateUser({
              variables: {
                user: {
                  email: values.email,
                  name: values.handle
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
              <span>Handle:</span>
              <input
                type="Text"
                name="handle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.handle}
              />
              {touched.handle && errors && errors.handle && (
                <div className="user-submit-error-block">{errors.handle}</div>
              )}
              <br />
              <span>Email:</span>
              <input
                type="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors && errors.email && (
                <div className="user-submit-error-block">{errors.email}</div>
              )}

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
    )}
  </Mutation>
);

export default AddUser;
