"use client";

import React from "react";
import { Sidebare } from "../../components/DashboardComponents/Sidebare";
import UserTable from "../../components/DashboardComponents/UserTable";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebare />
      <div className="flex-1 p-4">
        <h1 className="text-2xl mb-4">Gestion des Utilisateurs</h1>
        <UserTable />
      </div>
    </div>
  );
};

export default Dashboard;
