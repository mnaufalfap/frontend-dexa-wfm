/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
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
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("");
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("_token");
      const parsedUserId = id ? parseInt(id) : undefined;

      const url = `${HOST_API}/user/${id}`;
      const data = {
        user_id: parsedUserId,
        name: inputData.name,
        position_id: inputData.position_id,
        department_id: inputData.department_id,
        email: inputData.email,
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
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
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your name"
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
              value={inputData.position_id || ""}
              onChange={(val) => handleInputChange(val)}
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
            <Input
              size="lg"
              placeholder="Enter your department"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              name="department"
              value={inputData.department}
              onChange={handleInputChange}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              placeholder={undefined}
            >
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
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
