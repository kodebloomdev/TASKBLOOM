import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import AxiosService from "../../utils/ApiService";

// Register required elements
Chart.register(ArcElement, Tooltip, Legend);

function UserDataChart() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get(`/user/getdata`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading state
  if (loading) return <p>Loading chart...</p>;

  // Ensure valid data before rendering
  const chartData = {
    labels: ["Total Users", "Active Users", "Inactive Users"],
    datasets: [
      {
        data: [
          userData?.totalUsers || 0,
          userData?.activeUsers || 0,
          userData?.inactiveUsers || 0,
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
      },
    ],
  };

  return (
    <div style={{ width: "auto", height: "370px", alignContent: "center" }}>
      {userData ? (
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default UserDataChart;
