import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { AddUserQuery } from "./Queries/AddUserQuery";
import { GetProfileQuery } from "./Queries/GetUserQuery";

//Assests
import "../Assets/css/User/UserProfile.css";

const ProfileShema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required")
});

const UpdateEmailPref = props => (
  <Mutation mutation={AddUserQuery}
    refetchQueries={() => {
      return [{
        query: GetProfileQuery
      }];
    }}
    onCompleted={data => {
      data.updateUser.success === true && alert("Update Complete");
    }}>
    {(updateUser, { loading, error, data }) => (
      <div className="userProfile">
        <div className="userform">
          <h5>Feel free to update your email address</h5>
          {loading && console.log(loading.valueOf())}
          {error && console.log(error.graphQLErrors)}
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
                    //receiveEmails: values.receiveEmails,
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
                  {/* <div className="userFormGroup">
                  <label>Receive Emails:</label>
                  <input
                    type="Checkbox"
                    name="receiveEmails"
                    onChange={handleChange}
                    value={values.receiveEmails}
                  />{" "}
                </div> */}

                  <div>
                    <Button type="submit">Update</Button>
                  </div>
                  <br />
                  <a target="_blank" href="https://www.termsfeed.com/privacy-policy/1d035b59d3dcbf692dbce4eead4ec7d8">Leagal Stuff</a>
                </form>
              )}
          />
        </div>
      </div>
    )}
  </Mutation>
);

export default UpdateEmailPref;
