/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { HOST_API } from "../../config";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [inputData, setInputData] = useState({
    name: "",
    position_id: "",
    department_id: "",
    email: "",
  });
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePositionChange = (value: any) => {
    setSelectedPositionId(value);
  };

  const handleDepartmentChange = (value: any) => {
    setSelectedDepartmentId(value);
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("_token");

      const url = `${HOST_API}/user/signup`;
      const data = {
        name: inputData.name,
        email: inputData.email,
        position_id: selectedPositionId,
        department_id: selectedDepartmentId,
        password: "dexa1234",
        confirmPassword: "dexa1234",
        roleId: 2,
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/admin/dashboard");
      } else {
        <Alert color="red">Error updating user: {response.errors}</Alert>;
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div className="m-auto justify-center w-full max-w-[30%]">
      <Card
        className="h-full w-full"
        color="transparent"
        shadow={false}
        placeholder={undefined}
      >
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
            >
              Full Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter full name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              name="name"
              value={inputData.name || ""}
              onChange={handleInputChange}
            />

            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
            >
              Position
            </Typography>
            <Select
              label="Select Position"
              value={selectedPositionId}
              onChange={handlePositionChange}
              placeholder={undefined}
            >
              <Option value="1">Full Stack Development (Web)</Option>
              <Option value="2">Full Stack Development (Mobile)</Option>
            </Select>
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
            >
              Department
            </Typography>
            <Select
              label="Select Department"
              value={selectedDepartmentId}
              onChange={handleDepartmentChange}
              placeholder={undefined}
            >
              <Option value="1">Web Development</Option>
              <Option value="2">Mobile Development</Option>
            </Select>
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              name="email"
              value={inputData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            onClick={handleAddUser}
            placeholder={undefined}
          >
            Add User
          </Button>
        </form>
      </Card>
    </div>
  );
}
