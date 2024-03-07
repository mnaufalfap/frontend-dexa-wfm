/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { HOST_API } from "../../config";
import Webcam from "react-webcam";
import axios from "axios";
import { Alert } from "@material-tailwind/react";

interface AttendanceDataType {
  attendanceDateTime?: string;
  location?: string | null;
  imageSrc?: string | null;
}

export default function AttendancePage() {
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceDataType>({});
  const [image, setImage] = useState<string | null>();
  const [date, setDate] = useState<string | null>();
  const [userLocation, setUserLocation] = useState<string | undefined>();

  const handleStartAttendance = () => {
    setIsTakingAttendance(true);
  };

  const handleCapture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const currentDate = new Date();
      const attendanceDateTime = currentDate.toLocaleString();

      setImage(imageSrc);
      setDate(attendanceDateTime);
      setAttendanceData({
        imageSrc,
        attendanceDateTime,
      });
    } else {
      console.error("Webcam is null");
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(`${latitude},${longitude}`);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const handleAttendance = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("_token");
    const user_id = localStorage.getItem("id");
    const parsedUserId = user_id ? parseInt(user_id) : undefined;

    const data = {
      user_id: parsedUserId,
      date_time_attendance: date,
      location_attendance: userLocation,
      photo_attendance: image,
    };
    console.log(data);
    const url = `${HOST_API}/attendance`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    try {
      if (response.status === 200 || response.status === 201) {
        setIsTakingAttendance(false);
      }
    } catch (error: any) {
      return response.data.message;
    }
  };

  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    handleStartAttendance();
    getUserLocation();
  }, []);

  return (
    <div className="flex justify-center items-center h-auto">
      {isTakingAttendance ? (
        <div className="flex flex-col justify-center items-center">
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                position: "relative",
                width: "70%",
              }}
            />
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
                onClick={handleCapture}
              >
                Capture
              </button>
            </div>
          </>
          {attendanceData.imageSrc && (
            <>
              <div>
                <img src={attendanceData.imageSrc} alt="Attendance" />
                <p>
                  Attendance Date & Time: {attendanceData.attendanceDateTime}
                </p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAttendance}
              >
                Submit
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="m-auto justify-center w-full max-w-[80%]">
          <Alert color="green">
            Absen successfull for : {attendanceData.attendanceDateTime}
          </Alert>
        </div>
      )}
    </div>
  );
}
