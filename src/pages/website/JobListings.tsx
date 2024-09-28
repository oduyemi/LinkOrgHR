import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CareersHero from "../../components/ui/sections/CareersHero";
import { useAllPostedJobsMutation } from "../../store/services/recruitmentApi";
import { JobPosting, JobPostingDetails } from "../../types/onboarding";
import { Tag } from "antd"
import { daysAgo, formatCurrencyRange } from "../../utils/helperMethods";
import { Button } from "../../components/ui/Button";

const JobListings: React.FC = () => {
  const navigate = useNavigate();
  const [jobListings, setJobListings] = useState<any>();
  const [allPostedJobs, { isLoading: isAllPostedJobsLoading, data: allPostedJobsData }] = useAllPostedJobsMutation();

  useEffect(() => {
    allPostedJobs("");
  }, [allPostedJobs]);


  useEffect(() => {

    if (allPostedJobsData) {
      setJobListings(allPostedJobsData);
    }

  }, [allPostedJobsData]);

  return (
    <section className="bg-primary- min-h-screen flex flex-col  items-center px-4 md:px-8 lg:px-16 py-12">
      <CareersHero />
      <div
        className="py-20 px-4 bg-primary- rounded-[4px]  mt-24"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(54, 162, 235, 0.6) 1px, rgba(54, 162, 235, 0) 1px)`,
          backgroundSize: "20px 20px", // Adjust size of the pattern
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Job Listings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings != undefined && (
            jobListings.map((job: JobPostingDetails) => (
              <div
                onClick={() => navigate(`/job-listing/${job.jobID}`)}
                key={job.jobID}
                className="bg-white rounded-lg shadow-md p-6  hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.jobTitle}</h2>
                <div className="flex  justify-between items-center">
                  <p className="text-gray-700">{job.companyAddress}</p>

                  {/* Work mode tag (rounded Ant Design Tag) */}
                  <Tag className="" color="blue" style={{ borderRadius: '9999px' }}>
                    {job.workMode}
                  </Tag>
                </div>

                <p className="text-gray-600 mt-4">{`${job.description.substring(0, 120)} ...`}</p>
                {/* New div to show 'Days Ago' and Salary */}
                <div className="flex justify-between items-center mt-4">
                  {/* Show how many days ago the job was posted */}
                  <p className="text-gray-500">{`${daysAgo(job.postingDate)}`}</p>

                  {/* Salary tag */}
                  <Tag color="green" style={{ borderRadius: '9999px' }}>
                    {formatCurrencyRange(job?.minSalaryRange, job?.maxSalaryRange)}
                  </Tag>
                </div>

                <div className="w-[120px] h-[32px] mt-6">  <Button
                  mode={"solid"}
                  buttonText="View Details"
                  defaultColor="primary-1"
                  hoverColor="primary-2"
                />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
