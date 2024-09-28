import React from "react";

interface FileInputProps {
  label: string;
  id: string;
  accept: string;
  required?: boolean;
  error?: string | false;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  id,
  accept,
  required = false,
  error = "",
  onChange,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="file"
        id={id}
        accept={accept}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full border-[.8px] ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md py-2 px-3 shadow-sm flex-grow mr-2 p-2 border-[.8px] border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-1`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileInput;
