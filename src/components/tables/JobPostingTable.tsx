import React, { useState, useEffect } from "react";
import { Table, Spin, message, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { JobPostingDetails } from "../../types/onboarding";
import { useAllPostedJobsMutation, useRemoveJobMutation } from "../../store/services/recruitmentApi";

const onChange: TableProps<JobPostingDetails>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
};

const JobPostingTable: React.FC = () => {
  const [data, setData] = useState<JobPostingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPostedJobs, { data: allPostedJobsData, isLoading: isAllPostedJobsLoading }] = useAllPostedJobsMutation();
  const [removeJob, { data: removedJobSuccess, isLoading: isJobRemoving, error: removeJobFailure }] = useRemoveJobMutation();

  useEffect(() => {
    allPostedJobs("");
  }, [allPostedJobs]);

  useEffect(() => {
    if (allPostedJobsData) {
      setData(allPostedJobsData);
      setLoading(false);
    }
  }, [allPostedJobsData, setData, setLoading]);

  useEffect(() => {
    if (removeJobFailure) {
      message.success("Application deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return;
    }
  }, [removeJobFailure]);

  const columns: TableColumnsType<JobPostingDetails> = [
    {
      title: "Title",
      dataIndex: "jobTitle",
      width: "25%",
      filterSearch: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      width: "20%",
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Human Resources", value: "Human Resources" },
        { text: "Marketing", value: "Marketing" },
      ],
      onFilter: (value, record) => record.department.includes(value as string),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      filters: [
        { text: "Open", value: "Open" },
        { text: "Closed", value: "Closed" },
        { text: "On Hold", value: "On Hold" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (status) => {
        let color = "";

        if (status === "Open") {
          color = "green";
        } else if (status === "Closed") {
          color = "red";
        } else if (status === "On Hold") {
          color = "orange";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Posted Date",
      dataIndex: "postingDate",
      width: "20%",
      sorter: (a, b) =>
        new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            className="text-primary-1 py-1 px-2 rounded"
            onClick={() => console.log("Edit", record)}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 py-1 px-2 rounded"
            onClick={() => removeJob(record.jobID!)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          scroll={{ x: 1200 }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
          rowKey="id"
          className="bg-white shadow-md rounded-lg"
        />
      )}
    </div>
  );
};

export default JobPostingTable;
