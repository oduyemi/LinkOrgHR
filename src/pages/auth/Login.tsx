import React, { useState } from "react";
import { message } from "antd";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/ui/Button";
import { Radio } from "antd";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(54, 162, 235, 0.6) 1px, rgba(54, 162, 235, 0) 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-[6rem]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#010156]">
          Sign in to your account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#010156]"
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="flex items-center w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#010156]"
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="h-full absolute inset-y-0 right-0 flex items-center pr-3 mt-[5px] cursor-pointer"
            >
              {passwordVisible ? (
                <EyeSlashIcon className="text-gray-500 w-5 h-5" />
              ) : (
                <EyeIcon className="text-gray-500 w-5 h-5" />
              )}
            </span>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-700">
              Remember me
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Login as
            </label>
            <Radio.Group
              onChange={(e) => setLoginAsAdmin(e.target.value)}
              value={loginAsAdmin}
            >
              <Radio value={false} className="mr-4">
                Employee
              </Radio>
              <Radio value={true}>Admin</Radio>
            </Radio.Group>
          </div>
          <div className="mb-6 text-right">
            <a href="#" className="text-[#010156] hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="w-full h-[38px]">
            <Button
              mode={"solid"}
              buttonText="Login"
              loading={isLoading}
              defaultColor="primary-1"
              hoverColor="primary-2"
              // Disabled to remove functionality
              // onClick={() => {/* Login logic can be added here */}}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
