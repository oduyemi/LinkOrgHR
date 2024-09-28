export interface JobPosting {
  jobID?: number;
  jobTitle: string;
  department: string;
  companyAddress: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  benefits: string[];
  status: "Open" | "Closed" | "On Hold";
  postingDate: string;
  salaryMin: string;
  salaryMax: string;
  jobMode: string;
  jobCode?: string;
  workMode: string;
}

export interface JobPostingDetails {
  jobID?: number;
  jobTitle: string;
  department: string;
  companyAddress: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  benefits: string[];
  status: "Open" | "Closed" | "On Hold";
  postingDate: string;
  minSalaryRange: string;
  maxSalaryRange: string;
  jobMode: string;
  jobCode?: string;
  workMode: string;
}

export interface Application {
  jobID: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
  coverLetter: string;
  resume: File
}

export interface OnboardingStep {
  id: number;
  stepName: string;
  description: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
}

export interface ParsedResume {
  id: number;
  candidateName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  resumeText: string;
}

export interface OnboardingTask {
  id: number;
  taskName: string;
  assignee: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

export interface Interview {
  id: number;
  candidateName: string;
  interviewerName: string;
  interviewDate: string;
  interviewTime: string;
  position: string;
  notes: string;
}


export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

export interface JobApplications {
  applicantID: number;
  jobID: number;
  firstName: string;
  lastName: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  resumeFilePath: string;
  applicationDate: string; // If you prefer Date, use: Date instead of string
  dob: string; // If you prefer Date, use: Date instead of string
  status: number;
  statusText: string;
  coverletter: string;
  resumeFile: string;
}

export interface JobApplication {
  applicantID: number;
  jobID: number;
  firstName: string;
  lastName: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  resumeFilePath: string;
  applicationDate: string; // If you prefer Date, use: Date instead of string
  dob: string; // If you prefer Date, use: Date instead of string
  status: number;
  statusText: string;
  coverletter: string;
  resumeFile: string;
}