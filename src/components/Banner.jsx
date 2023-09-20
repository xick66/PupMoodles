import React, { useState } from "react";
import Entry from "./Entry";
import Chart from "./Chart";
import History from "./History";
import Authenticator from "./Authenticator";
import { Button } from "@nextui-org/react";

const Banner = ({ data, deleteItem }) => {
  const [activeTab, setActiveTab] = useState("New Entry");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderSelectedComponent = () => {
    if (activeTab === "New Entry") {
      return <Entry />;
    } else if (activeTab === "Chart") {
      return <Chart data={data} />;
    } else {
      return <History data={data} deleteItem={deleteItem} />;
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex" }}>
        <Button
          variant={activeTab === "New Entry" ? "bordered" : "flat"}
          onPress={() => handleTabChange("New Entry")}
          style={{ flex: 1, justifyContent: "center", height: 50 }}
          radius="none"
          color="primary"
        >
          New Entry
        </Button>
        <Button
          variant={activeTab === "Chart" ? "bordered" : "flat"}
          onPress={() => handleTabChange("Chart")}
          style={{ flex: 1, justifyContent: "center", height: 50 }}
          radius="none"
          color="primary"
        >
          Chart
        </Button>
        <Button
          variant={activeTab === "History" ? "bordered" : "flat"}
          onPress={() => handleTabChange("History")}
          style={{ flex: 1, justifyContent: "center", height: 50 }}
          radius="none"
          color="primary"
        >
          History
        </Button>
      </div>
      <Authenticator />
      <div style={{ flex: 1, marginTop: 50, overflow: 'auto' }}>{renderSelectedComponent()}</div>
    </div>
  );
};

export default Banner;
