/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import FormikDropdown from "../components/FormikDropdown";
import FormikTextField from "../components/FormikTextField";
import FormikSwitch from "../components/FormikSwitch";
import FormikCheckBox from "../components/FormikCheckBox";
import FormikSlider from "../components/FormikSlider";
import FormikRating from "../components/FormikRating";
import FormikRadioGroup from "../components/FormikRadioGroup";
import FormikCheckBoxGroup from '../components/FormikCheckBoxGroup'

function WithTextField() {
  const [title, setTitle] = React.useState([
    { id: 1, name: "Mr." },
    { id: 2, name: "Mrs." },
  ]);

  const [gender, setGender] = React.useState([
    {id: '1',name: 'Male'},
    {id: '2',name: 'Female'},
    {id: '3',name: 'Unknown'}
  ])

  const [hobby, setHobby] = React.useState([
    {id: 1,name: 'Games'},
    {id: 2,name: 'Shopping'},
    {id: 3,name: 'Jogging'}
  ])

  React.useEffect(() => {}, []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.titleId) {
        errors.titleId = "required";
      }
      return errors;
    },
    initialValues: {
      titleId: 0,
      firstName: "",
      lastName: "",
      isActive: true,
      isAllow: true,
      score: 2,
      rating: 5,
      genderId: 0,
      hobbies:[2]
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        {/* Title */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="titleId"
            label="Title"
            data={title}
            firstItemText="Select Title"
          />
        </Grid>

        {/* Start firstName */}
        <Grid item xs={12} lg={3}>
          <FormikTextField
            formik={formik}
            name="firstName"
            label="First Name"
          />
        </Grid>

        {/* Start lastname */}
        <Grid item xs={12} lg={3}>
          <FormikTextField formik={formik} name="lastName" label="Last Name" />
        </Grid>

        {/* Gender */}
        <Grid item xs={12} lg={3}>
          <FormikRadioGroup
            formik={formik}
            name="genderId"
            label="Gender"
            data={gender}
          />
        </Grid>

        {/* Hobby */}
        <Grid item xs={12} lg={3}>
          <FormikCheckBoxGroup
            formik={formik}
            name="hobbies"
            label="Hobbies"
            data={hobby}
          />
        </Grid>

        {/* isActive */}
        <Grid item xs={12} lg={3}>
          <FormikSwitch formik={formik} name="isActive" label="Active" />
        </Grid>

        {/* isAllow */}
        <Grid item xs={12} lg={3}>
          <FormikCheckBox formik={formik} name="isAllow" label="Allow" />
        </Grid>

        {/* score */}
        <Grid item xs={12} lg={3}>
          <FormikSlider
            formik={formik}
            name="score"
            label="Score"
            min={0}
            max={20}
            step={0.5}
          />
        </Grid>

        {/* rating */}
        <Grid item xs={12} lg={3}>
          <FormikRating
          formik={formik}
          name="rating"
          label="Rating"
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
    </form>
  );
}

export default WithTextField;
