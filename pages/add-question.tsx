import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";
import Layout from "../components/wrappers/Layout";
import AddQuestion from "../components/AddQuestion";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout title="Add Question">
      <div className="flex flex-col pt-5 font-mono text-white h-screen w-screen overlay">
        <div className="flex flex-col items-center p-3 justify-center">
          <Link href="/">
            <h1 className="site-title uppercase text-xl">Bar Confessions</h1>
          </Link>
        </div>
        <div className="px-10 relative z-20">
          <AddQuestion />
        </div>
        <div className="absolute z-10 md:hidden block flex  flex-row absolute bottom-0 overflow-hidden">
          <img
            className=" w-96"
            src="assets/img/palmtree.svg"
            alt="palm tree"
          />
          <img
            className=" w-80"
            src="assets/img/palmtreev2.svg"
            alt="palm tree"
          />
        </div>
        {/* <PostModal /> */}
        {/* <DataRead />  */}
      </div>
    </Layout>
  );
};

export default Home;
