import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";
import Layout from "../components/wrappers/Layout";
import AddQuestion from "../components/AddQuestion";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="flex flex-col justify-center font-mono text-white h-screen w-screen art-bar-bg">
        <div className="flex flex-col justify-center">
          <h1 className="site-title uppercase">Bar Confessions</h1>
        </div>
        <div>
          <AddQuestion />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
