import { useState, useEffect, SetStateAction } from "react";
import { Navigate } from "react-router-dom";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { HOST_API } from "../../../config";

const TABLE_HEAD = ["Name", "Position", "Department", "Action"];

export default function TableEmployee() {
  const [employeeData, setEmployeeData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("_token");

        const url = `${HOST_API}/user/list-employee`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployeeData(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleEdit = (user_id: SetStateAction<null>) => {
    setEditUserId(user_id);
  };

  const handleDelete = async (user_id: SetStateAction<null>) => {
    try {
      const token = localStorage.getItem("_token");

      const url = `${HOST_API}/user/${user_id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        window.location.href = "/admin/dashboard";
      }

      // Update employeeData after deletion
      setEmployeeData(
        employeeData.filter((employee) => employee.user_id !== user_id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (editUserId) {
    return <Navigate to={`edit?=${editUserId}`} />;
  }

  return (
    <>
      <div className="mb-3">
        <a href="#">
          <Button color="green" placeholder={undefined}>
            Add Employee
          </Button>
        </a>
      </div>
      <Card className="h-full w-full overflow-scroll" placeholder={undefined}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeData &&
              employeeData.map(
                ({ user_id, name, job_position, department }, index) => {
                  const isLast = index === employeeData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={user_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {job_position.position_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {department.department_name}
                        </Typography>
                      </td>
                      <td
                        className={`${classes} bg-blue-gray-50/50 flex flex-col`}
                      >
                        <Typography
                          as="button"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          placeholder={undefined}
                          onClick={() => handleEdit(user_id)}
                        >
                          Edit
                        </Typography>
                        <Typography
                          as="button"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          placeholder={undefined}
                          onClick={() => handleDelete(user_id)}
                        >
                          Delete
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
