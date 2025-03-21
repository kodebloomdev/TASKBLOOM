import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import AxiosService from "../../utils/ApiService";

// ✅ Register required components
ChartJS.register(
  CategoryScale,  // Register the missing CategoryScale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CircleProgressBar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosService.get("/user/getdata"); 
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ width: "auto", height: "270px", alignContent: "center" }}>
      {userData && (
        <Line
          data={{
            labels: ["Total Users", "Active Users", "Inactive Users"],
            datasets: [
              {
                label: "Number of Users",
                data: [
                  userData.totalUsers,
                  userData.activeUsers,
                  userData.inactiveUsers,
                ],
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                borderColor: "rgba(52, 152, 219, 1)",
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "category", // ✅ Explicitly set category scale
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CircleProgressBar;
