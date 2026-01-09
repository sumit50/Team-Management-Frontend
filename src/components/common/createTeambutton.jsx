import React, {useState} from "react";
import Button from "./button";
import CreateTeamModal from "./confirmModel";

const CreateTeamButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = (teamData) => {
    console.log("Creating team:", teamData);
    // Add API call here
  };

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => setIsModalOpen(true)} variant="primary">
          + Create Team Leader
        </Button>
      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
      />
    </>
  );
};

export default CreateTeamButton;
