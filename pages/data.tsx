import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";
import Layout from "../components/wrappers/Layout";

const Data: NextPage = () => {
  return (
    <Layout title="data">
    <div className="flex flex-col justify-center font-mono text-white h-screen w-screen art-bar-bg">
      <DataRead />
    </div>
    </Layout>
  );
};

export default Data;
