import React from 'react'
import { FormikHelpers, useFormik } from 'formik'
import styled from 'styled-components'
import {useAppDispatch} from "../store/store";
import {addNewCitizen} from "../reducers/CitizensReducer";

export type FormikValuesType = {
  age: string
  city: string
  name: string
  someNote: string
}
type FormikErrorType = {
  age?: string
  city?: string
  name?: string
  someNote?: string
}

const AddCitizen = () => {
const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      age: '',
      city: '',
      name: '',
      someNote: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.age || +values.age < 18) {
        errors.age = 'Required field cannot be empty or less than 18 y.o'
      }
      if (!values.name) {
        errors.name = 'Required'
      }
      if (!values.city) {
        errors.city = 'Required'
      }
      if (!values.someNote) {
        errors.someNote = 'Required'
      }
      return errors;
    },
    onSubmit: async (
      values: FormikValuesType,
      formikHelpers: FormikHelpers<FormikValuesType>
    ) => {
      const action = await dispatch(addNewCitizen(values))
      // if(addNewCitizen.rejected.match(action)){
      //   if(action.payload?.fieldsErrors){
      //     const error = action.payload.fieldsErrors;
      //     formikHelpers.setFieldError(error.field, error.error);
      //   }
      // }
      formik.resetForm()
    },
  })

  const Label = styled.label`
     {
      font-size: 14px;
      color: black;
    }
  `
  const Form = styled.form`
     {
      display: flex;
      flex-direction: column;
    }
  `
  const Button = styled.button`
     {
      border: none;
      background-color: transparent;
      text-decoration: underline;
      font-family: 'BM Jua', serif;
      color: #152d68;
    }
  `
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="age">
        Age:
        <br />
        <input type="number" {...formik.getFieldProps('age')} />
        {formik.touched.age && formik.errors.age ? (
            <div style={{ color: 'red' }}>{formik.errors.age}</div>
        ) : null}
      </label>

      <label htmlFor="city">
        City:
        <br />
        <input type="text" {...formik.getFieldProps('city')} />
        {formik.touched.city && formik.errors.city ? (
            <div style={{ color: 'red' }}>{formik.errors.city}</div>
        ) : null}
      </label>

      <label htmlFor="name">
        Name:
        <br />
        <input type="text" {...formik.getFieldProps('name')} />
        {formik.touched.name && formik.errors.name ? (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
      </label>

      <label htmlFor="note">
        Leave a note:
        <br />
        <input type="text" {...formik.getFieldProps('someNote')} />
        {formik.touched.someNote && formik.errors.someNote ? (
            <div style={{ color: 'red' }}>{formik.errors.someNote}</div>
        ) : null}
      </label>

      <button type={'submit'}>Send</button>
    </form>
  )
}

export default AddCitizen
