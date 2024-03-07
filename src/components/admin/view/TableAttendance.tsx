import { useState, useEffect, SetStateAction } from "react";
import { Navigate } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { HOST_API } from "../../../config";

const TABLE_HEAD = ["Name", "Date Time", "Location", "Capture"];

export default function TableEmployee() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const token = localStorage.getItem("_token");

        const url = `${HOST_API}/list-attendance`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendanceData(response.data.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <>
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
            {attendanceData &&
              attendanceData.map(
                (
                  {
                    user_id,
                    user,
                    date_time_attendance,
                    location_attendance,
                    photo_attendance,
                  },
                  index
                ) => {
                  const isLast = index === attendanceData.length - 1;
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
                          {user.name}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {date_time_attendance}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={undefined}
                        >
                          {location_attendance}
                        </Typography>
                      </td>
                      <td
                        className={`${classes} bg-blue-gray-50/50 flex flex-col`}
                      >
                        <img
                          src={photo_attendance} // Atribut src diisi dengan data base64
                          alt="Attendance Photo" // Menambahkan atribut alt untuk ketersediaan aksesibilitas
                          className="w-16 h-16 rounded-md object-cover" // Menyesuaikan ukuran gambar sesuai kebutuhan
                        />
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
