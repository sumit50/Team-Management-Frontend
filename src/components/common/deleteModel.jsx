import React from 'react'

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName, itemType = "item" }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Delete {itemType}?
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">"{itemName}"</span>? 
          This action cannot be undone and will permanently remove all associated data.
        </p>

        {/* Warning Details */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6">
          <div className="flex items-start">
            <svg 
              className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Warning:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>All team members will be reassigned</li>
                <li>Associated tasks and data will be lost</li>
                <li>This action is irreversible</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};

// Specific component for team leader deletion
export const DeleteTeamLeaderModal = ({ isOpen, onClose, onConfirm, teamLeader }) => {
  return (
    <DeleteModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      itemName={teamLeader?.name || "Team Leader"}
      itemType="Team Leader"
    />
  );
};

export default DeleteModal;
