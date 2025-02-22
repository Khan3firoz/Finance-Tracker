'use client'
import React, { useEffect } from "react";
import Content from "./components/Content";
import { useExpenceContext } from "./Context/ExpenceContext";
import ExpenceModal from "./Modal/AddExpenceModal";
import AddAccountModal from "./Modal/AddAccountModal";

export default function Home() {
  const { isOpen, handleClosed } = useExpenceContext();

  return (
    <>
      <Content />
      {isOpen && <AddAccountModal />}
    </>

  );
}
