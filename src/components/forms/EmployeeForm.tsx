import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import FileInput from "../ui/FileInput";
import SelectField from "../ui/SelectField";
import { Button } from "../ui/Button";
import axios from "axios"; // Axios for making API requests
import { toast } from "sonner";
import { Alert } from "antd";
import { useLoginMutation } from "../../store/services/authApi";

const positions = ["Manager", "Developer", "Designer", "QA", "HR"];
const departments = ["Engineering", "Marketing", "Sales", "HR"];
const states = ["California", "Texas", "New York", "Florida"];
const lgas = ["LGA1", "LGA2", "LGA3", "LGA4"];

interface Employee {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  state: string;
  lga: string;
  passport: File | null;
  resume: File | null;
}

const EmployeeForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [login, { data: verifyEmailData }] = useLoginMutation();

  // Formik setup
  const formik = useFormik<Employee>({
    initialValues: {
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      state: "",
      lga: "",
      passport: null,
      resume: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      position: Yup.string().required("Position is required"),
      department: Yup.string().required("Department is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().matches(
        /^(\+?\d{1,3}[- ]?)?\d{10}$/,
        "Phone number is not valid"
      ),
      // .required("Phone is required")
      dob: Yup.date().required("Date of Birth is required"),
      address: Yup.string().required("Address is required"),
      state: Yup.string().required("State is required"),
      lga: Yup.string().required("LGA is required"),
    }),
    onSubmit: (values) => {
    },
  });

  // Trigger the API call when resume is uploaded
  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("resume", file);
      setIsLoading(true);

      // Create a form data object
      const formData = new FormData();
      formData.append("file", file);
      await login(formData);

      try {
        // Call the API endpoint
        const response = await axios.post(
          "https://odoobros.pythonanywhere.com/api/extract-info/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Assuming the response data contains personal information like name, email, etc.
        const { name, email, address, phone } = response.data;

        // Populate the form with the extracted data
        formik.setFieldValue("name", name || "");
        formik.setFieldValue("email", email || "");
        formik.setFieldValue("address", address || "");
        formik.setFieldValue("phone", phone || "");

        toast.success("Employee CV parsed successfully", {
          duration: 5000,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading resume:", error);
        setIsLoading(false);
      }
    }
  };

  const customAlertStyle = {
    backgroundColor: "#E3F2FD", // Light shade of primary color for background
    borderColor: "#010156", // Primary color for border
    color: "#0369A1", // Darker shade of primary color for text
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full mx-auto">
      <div className="flex flex-wrap -mx-3">
        {/* Left column */}
        <div className="w-full md:w-1/2 px-3 mb-6">
          <InputField
            label="Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.name && formik.errors.name}
          />
          <SelectField
            label="Position"
            id="position"
            name="position"
            value={formik.values.position}
            options={positions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.position && formik.errors.position}
          />
          <SelectField
            label="Department"
            id="department"
            name="department"
            value={formik.values.department}
            options={departments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.department && formik.errors.department}
          />
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // required
            error={formik.touched.phone && formik.errors.phone}
          />
          <InputField
            label="Date of Birth"
            id="dob"
            name="dob"
            type="date"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.dob && formik.errors.dob}
          />
        </div>
        {/* Right column */}
        <div className="w-full md:w-1/2 px-3 mb-6">
          <InputField
            label="Address"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.address && formik.errors.address}
          />
          <SelectField
            label="State"
            id="state"
            name="state"
            value={formik.values.state}
            options={states}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // required
            error={formik.touched.state && formik.errors.state}
          />
          <SelectField
            label="LGA"
            id="lga"
            name="lga"
            value={formik.values.lga}
            options={lgas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.lga && formik.errors.lga}
          />
          <FileInput
            label="Passport Photo"
            id="passport"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue("passport", event.currentTarget.files?.[0])
            }
            required
            error={formik.touched.passport && formik.errors.passport}
          />
          <div>
            <Alert
              message="Tip"
              description="You can upload employee resume to pre-fill the form."
              type="info"
              showIcon
              className="mb-4"
              style={customAlertStyle} // Custom style applied
            />
            <FileInput
              label="Resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              required
              error={formik.touched.resume && formik.errors.resume}
            />
          </div>
        </div>
      </div>
      <div className="w-[150px] h-[38px]">
        <Button
          mode={"solid"}
          buttonText="Save"
          loading={isLoading}
          defaultColor="primary-1"
          hoverColor="primary-2"
        />
      </div>
    </form>
  );
};

export default EmployeeForm;
