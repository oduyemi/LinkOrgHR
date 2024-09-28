import React, { useEffect, useState } from "react";
import { Application, JobApplication, JobApplications, JobPostingDetails } from "../../../types/onboarding";
import ApplicationTable from "../../../components/tables/ApplicationTable";
import ApplicationModal from "../../../components/modals/ApplicationModal";
import JobListingCard from "../../../components/JobListingCard";
import PageTitle from "../../../components/ui/PageTitle";
import { Button } from "../../../components/ui/Button";
import { JobPostingDetails as FullJobPosting } from "../../../types/onboarding";
import { useAllPostedJobsMutation, useGetApplicationsByJobIdMutation, useGetApplicationsMutation } from "../../../store/services/recruitmentApi";


// // Mock data for job postings
// const mockJobPostings: JobPosting[] = [
//   {
//     id: 1,
//     title: "Software Engineer",
//     department: "Engineering",
//     location: "New York",
//     status: "Open",
//     salaryMin: "80000",
//     salaryMax: "120000",
//   },
//   {
//     id: 2,
//     title: "Product Manager",
//     department: "Product",
//     location: "San Francisco",
//     status: "Open",
//     salaryMin: "100000",
//     salaryMax: "150000",
//   },
//   {
//     id: 3,
//     title: "UX Designer",
//     department: "Design",
//     location: "Remote",
//     status: "Open",
//     salaryMin: "70000",
//     salaryMax: "110000",
//   },
// ];

// // Mock data for applications
// const mockApplications: Application[] = [
//   {
//     id: 1,
//     applicantName: "John Doe",
//     position: "Software Engineer",
//     status: "Applied",
//     dateApplied: "2023-05-01",
//   },
//   {
//     id: 2,
//     applicantName: "Jane Smith",
//     position: "Software Engineer",
//     status: "Screening",
//     dateApplied: "2023-05-02",
//   },
//   {
//     id: 3,
//     applicantName: "Bob Johnson",
//     position: "Product Manager",
//     status: "Interview",
//     dateApplied: "2023-05-03",
//   },
//   {
//     id: 4,
//     applicantName: "Alice Brown",
//     position: "UX Designer",
//     status: "Applied",
//     dateApplied: "2023-05-04",
//   },
// ];

const Applications: React.FC = () => {
  const [jobPostings] = useState<JobPostingDetails[]>();
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPostingDetails | null>(null);
  const [applications, setApplications] = useState<JobApplications[]>();
  const [showModal, setShowModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<JobApplication | null>(null);
  const [allPostedJobs, { isLoading: isAllPostedJobsLoading, data: allPostedJobsData }] = useAllPostedJobsMutation();
  const [jobApplications, { isLoading: isJobApplicationsLoading, data: allJobApplicationsData }] = useGetApplicationsByJobIdMutation();
  const [jobListings, setJobListings] = useState<any>();
  const [currentJobId, setCurrentJobId] = useState<number>();


  useEffect(() => {
    allPostedJobs("");
  }, [allPostedJobs]);


  useEffect(() => {
    if (allPostedJobsData) {
      // Assuming allPostedJobsData is an array of job objects
      const jobsObject = allPostedJobsData.map((singlePostedJob: JobPostingDetails) => {
        return {
          ...singlePostedJob, // Spread the existing job properties
          minSalaryRange: singlePostedJob.minSalaryRange || 0, // Update minSalary if needed
          maxSalaryRange: singlePostedJob.maxSalaryRange || 0, // Update maxSalary if needed
        };
      });
      setJobListings(jobsObject);
    }

  }, [allPostedJobsData]);

  useEffect(() => {
    if (selectedJobPosting?.jobID) {
      jobApplications(selectedJobPosting?.jobID);

    }
  }, [selectedJobPosting?.jobID]);

  useEffect(() => {

    if (allJobApplicationsData) {
      setApplications(allJobApplicationsData)
    }

  }, [allJobApplicationsData]);

  const handleShowModal = (application: JobApplication | null) => {
    setCurrentApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentApplication(null);
  };

  const handleDeleteApplication = (id: number) => {
    setApplications(applications!.filter((app) => app.jobID !== id));
  };

  const handleSelectJobPosting = (jobPosting: JobPostingDetails) => {
    setSelectedJobPosting(jobPosting);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Job Applications" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-wrap justify-start">
          {allPostedJobsData != null && (allPostedJobsData!.map((jobPosting) => (
            <JobListingCard
              key={jobPosting.jobID}
              jobPosting={jobPosting as FullJobPosting}
              onClick={() => handleSelectJobPosting(jobPosting)}
            />
          )))}
        </div>

        {selectedJobPosting && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Applicants for {selectedJobPosting.jobTitle}
            </h2>
            {/* <div className="flex w-[200px] h-[38px] mb-4">
              <Button
                onClick={() => handleShowModal(null)}
                mode={"solid"}
                buttonText="Add New Application"
                loading={false}
                defaultColor="primary-1"
                hoverColor="primary-2"
              />
            </div> */}
            <ApplicationTable
              applications={applications!}
              onEdit={handleShowModal}
              onDelete={handleDeleteApplication}
            />
          </div>
        )}

        {showModal && (<ApplicationModal
          show={showModal}
          handleClose={handleCloseModal}
          currentApplication={currentApplication}
        />)}
      </div>
    </div>
  );
};

export default Applications;
