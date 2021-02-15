/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@material-ui/core/";
import FormikDropdown from "../components/FormikDropdown";
import FormikTextField from "../components/FormikTextField";

function WithDropdown(props) {
  const [data, setData] = React.useState([]);
  const [position, setPosition] = React.useState([
    { id: 1, name: "employee" },
    { id: 2, name: "boss" },
  ]);

  React.useEffect(() => {
    setData([
      { id: 1, name: "Mr." },
      { id: 2, name: "Mrs." },
    ]);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.titleId) {
        errors.titleId = "required";
      }

      if (!values.positionId) {
        errors.positionId = "required";
      }

      return errors;
    },
    initialValues: {
      titleId: 0,
      positionId: 0,
      firstName: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <Grid container spacing={3}>
        {/* Start Title */}
        <Grid item xs={12} lg={3}>
          <FormControl
            fullWidth
            error={formik.errors.titleId && formik.touched.titleId}
          >
            <InputLabel id="titleID">Title</InputLabel>
            <Select
              labelId="titleId"
              name="titleId"
              value={formik.values.titleId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <MenuItem disabled value={0}>
                <em>Select Title</em>
              </MenuItem>
              {data.map((item) => (
                <MenuItem key={`titleId_${item.id}`} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.titleId && formik.touched.titleId && (
              <FormHelperText>{formik.errors.titleId}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/* End Title */}

        {/* Start position */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            name="positionId"
            label="Position"
            data={position}
            valueFieldName="id"
            displayFieldName="name"
            firstItemText="Select Position"
            disableFirstItem={true}
            selectedCallback={(value) => {
              alert("you select: " + value);
            }}
          />
        </Grid>
        {/* Start position */}

        {/* Start firstName */}
        <Grid item xs={12} lg={3}>
          <FormikTextField
            formik={formik}
            name="firstName"
            label="First Name"
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

export default WithDropdown;
