import React, { useState } from "react";
import Button from "./button";
import CreateTeamModal from "./confirmModel";
import toast from "react-hot-toast";

import { createTeamLeaderApi, registerUserApi } from "../../services/adminApi";

const CreateTeamButton = ({ customTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = async (teamData) => {
    // Call the appropriate API based on the role
    if (teamData.role === "team leader") {
      console.log("Creating team leader:", teamData);
      return await createTeamLeaderApi(teamData);
    } else {
      console.log("Creating team member:", teamData);
      // Use the proper register endpoint for members
      return await registerUserApi(teamData);
    }
  };

  return (
    <>
      {customTrigger ? (
        React.cloneElement(customTrigger, { onClick: () => setIsModalOpen(true) })
      ) : (
        <div className="mb-6">
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            Create Team Leader
          </Button>
        </div>
      )}

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
      />
    </>
  );
};

export default CreateTeamButton;
