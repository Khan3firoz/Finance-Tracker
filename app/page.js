'use client'
import React, { useEffect } from "react";
import Content from "./components/Content";
import { useExpenceContext } from "./Context/ExpenceContext";
import ExpenceModal from "./Modal/AddExpenceModal";
import AddAccountModal from "./Modal/AddAccountModal";
import { useAppContext } from "./Context/AppContext";
import AddCategoryModal from "./Modal/AddCategory";
import AddTxnModal from "./Modal/AddTxnModal";

export default function Home() {
  const { isOpen, handleClosed } = useExpenceContext();
  const { isAddCat, isAddTxn } = useAppContext()

  return (
    <>
      <Content />
      {isOpen && <AddAccountModal />}
      {isAddCat && <AddCategoryModal />}
      {isAddTxn && <AddTxnModal />}
    </>

  );
}
