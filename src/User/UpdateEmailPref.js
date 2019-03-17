import React from "react";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import { AddUserQuery } from "./Queries/AddUserQuery";

//Assests
import "../Assets/css/UserProfile.css";

const UpdateEmailPref = props => (
  <Mutation mutation={AddUserQuery}>
    {(updateUser, { loading, error, data }) => (
      <div className="userProfile">
        <div className="userform">
          <h5>Set your your email preferences</h5>
          {loading && console.log(props)}
          {error && console.log(error)}
          {data && data.updateUser && alert("Email Preferences Set")}
          <Formik
            initialValues={{
              receiveEmails: props.receiveEmails
            }}
            onSubmit={values => {
              updateUser({
                variables: {
                  user: {
                    receiveEmails: values.receiveEmails
                  }
                }
              });
            }}
            render={({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
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
