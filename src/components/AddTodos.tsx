import React from "react";
import { Form, Formik, useFormik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4, validate } from "uuid";

const AddTodos = () => {
  const navigate = useNavigate();
  const unique_id = uuidv4;

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    assignee: yup.string().required("Assignee is required"),
    date: yup.date()
      .min(new Date(), "due date cannot be less than current data")
      .required("Due date is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      description: "",
      assignee: "",
      date: "",
      isCompleted:false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Post data to your API endpoint
        await axios.post("http://localhost:8000/todos", {
          id: unique_id,
          title: values.title,
          description: values.description,
          assignee: values.assignee,
          date: values.date,
          isCompleted:values.isCompleted
        });

        // Redirect to home page or wherever you want after successful submission
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to add task. Please try again.");
      }
    },
  });

  return (
  
    <div className="container">
      <h2>Add Task</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-danger">{formik.errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="assignee" className="form-label">
            Assignee
          </label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.assignee}
          />
          {formik.touched.assignee && formik.errors.assignee && (
            <div className="text-danger">{formik.errors.assignee}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date" // Un-commented this line
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />

          {formik.touched.date && formik.errors.date && (
            <div className="text-danger">{formik.errors.date}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodos;
