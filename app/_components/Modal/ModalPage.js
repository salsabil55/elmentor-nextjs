"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import Modal from "./Modal"; // Import the Modal component

const PageWithAutoOpenModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Automatically open the modal when the component mounts
  useEffect(() => {
    setModalOpen(true); // Set the modal open when the component is loaded
  }, []); // Empty dependency array ensures this runs only once

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}></Modal>
    </div>
  );
};

export default PageWithAutoOpenModal;
