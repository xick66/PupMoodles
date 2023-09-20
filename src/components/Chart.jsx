import React, { useState, useEffect } from "react";
import { Spinner, Progress } from "@nextui-org/react";
import MoodChart from "./MoodChart";

const Chart = ({ data }) => {
  const [averageScore, setAverageScore] = useState(0);
  const [color, setColor] = useState("secondary");

  const getAvg = () => {
    let avg = 0;
    data.forEach((entry) => {
      avg += entry.value;
    });

    avg /= data.length;
    return avg;
  };

  useEffect(() => {
    setAverageScore(getAvg());
    setColor(getColor((averageScore + 3) / 6));
  }, []);

  const getEmoji = (val) => {
    if (val > 1) {
      return "😁";
    } else if (val > 0 && val < 1) {
      return "🙂";
    } else if (val > -1 && val < 0) {
      return "😐";
    } else if (val > -2 && val < -1) {
      return "☹️";
    } else if (val > -3 && val < -2) {
      return "😭";
    } else {
      return "💀";
    }
  };

  const getColor = (val) => {
    if (val > 1) {
      return "success";
    } else if (val > 0 && val < 1) {
      return "success";
    } else if (val > -1 && val < 0) {
      return "warning";
    } else if (val > -2 && val < -1) {
      return "danger";
    } else if (val > -3 && val < -2) {
      return "danger";
    } else {
      return "default";
    }
  };

  if (!data) {
    return <Spinner />;
  }
  return (
    <div>
      <div style={{ height: "60vh" }}>
        <MoodChart data={data} />
      </div>
      <div className="stats max-w-xl mx-auto">
        <p color="white">Your Average Score is: {getEmoji(averageScore)}</p>
        <Progress
          color={color}
          value={((averageScore + 3) / 6) * 100}
          css={{ width: 650 }}
        />
      </div>
    </div>
  );
};

export default Chart;
