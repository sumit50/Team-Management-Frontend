import React from 'react'
import {ArrowPathIcon} from "@heroicons/react/24/solid";


const RefreshButton = ({ onClick }) => {
  const handleRefresh = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.reload();
    }
  };

  return (

    <button
      onClick={handleRefresh}
      className={""}
    >
                              <ArrowPathIcon className="size-5" />

      
    </button>
  );
};

export default RefreshButton;