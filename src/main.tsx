import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Dashboard } from "./pages/admin/index.ts";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeLayout from "./pages/layouts/EmployeeLayout.tsx";
import AddEmployee from "./pages/admin/employee/AddEmployee.tsx";
import JobPosting from "./pages/admin/onboarding/JobPosting.tsx";
import Applications from "./pages/admin/onboarding/Applications.tsx";
import OnboardingProcess from "./pages/admin/onboarding/OnboardingProcess.tsx";
import ResumeParsing from "./pages/admin/onboarding/ResumeParsing.tsx";
import OnboardingWorkflow from "./pages/admin/onboarding/OnboardingWorkflow.tsx";
import InterviewScheduling from "./pages/admin/onboarding/InterviewScheduling.tsx";
import TimeTracking from "./pages/admin/attendance/TimeTracking.tsx";
import LeaveManagement from "./pages/admin/attendance/LeaveManagement.tsx";
import OvertimeManagement from "./pages/admin/attendance/OvertimeManagement.tsx";
import SalaryCalculations from "./pages/admin/payroll/SalaryCalculations.tsx";
import Login from "./pages/auth/Login.tsx";
import EmployeeDocumentManager from "./pages/admin/employee/EmployeeDocumentManager.tsx";
import EmployeeList from "./pages/admin/employee/EmployeeList.tsx";
import WebsiteLayout from "./pages/layouts/WebsiteLayout.tsx";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard.tsx";
import EmployeeProfile from "./pages/Employee/EmployeeProfile.tsx";
import PayslipPage from "./pages/Employee/PayslipPage.tsx";
import LeaveRequestPage from "./pages/Employee/LeaveRequestPage.tsx";
import PerformanceReviewPage from "./pages/Employee/PerformanceReviewPage.tsx";
import DocumentManagementPage from "./pages/Employee/DocumentManagementPage.tsx";
import Attendance from "./pages/Admin/attendance/Attendance.tsx";
import PayslipGenerator from "./pages/Admin/payroll/PayslipGenerator.tsx";
import TaxManager from "./pages/Admin/payroll/TaxManager.tsx";
import HMOManager from "./pages/Admin/payroll/HMOManager.tsx";

const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees",
        element: <EmployeeList />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees/add",
        element: <AddEmployee />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees/documents",
        element: <EmployeeDocumentManager />,
        errorElement: <NotFoundPage />,
      },

      // Onboarding Routes
      {
        path: "/onboarding/job-postings",
        element: <JobPosting />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/applications",
        element: <Applications />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/resume-parsing",
        element: <ResumeParsing />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/onboarding-workflows",
        element: <OnboardingWorkflow />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/interview-scheduling",
        element: <InterviewScheduling />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/onboarding-process",
        element: <OnboardingProcess />,
        errorElement: <NotFoundPage />,
      },

      // Attendance Routes
      {
        path: "/attendance",
        element: <Attendance />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/time-tracker",
        element: <TimeTracking />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/leave-management",
        element: <LeaveManagement />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/overtime",
        element: <OvertimeManagement />,
        errorElement: <NotFoundPage />,
      },

      // Payroll Routes
      {
        path: "/payroll/salary-calculation",
        element: <SalaryCalculations />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/payroll/tax",
        element: <TaxManager />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/payroll/hmo",
        element: <HMOManager />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/payroll/payslip",
        element: <PayslipGenerator />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <EmployeeLayout />,
    children: [
      {
        path: "/employee-dashboard",
        element: <EmployeeDashboard />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employee-profile",
        element: <EmployeeProfile />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employee-payslips",
        element: <PayslipPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employee-leave-requests",
        element: <LeaveRequestPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employee-performance",
        element: <PerformanceReviewPage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employee-document-management",
        element: <DocumentManagementPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" expand={false} />
    </ChakraProvider>
  </React.StrictMode>
);
