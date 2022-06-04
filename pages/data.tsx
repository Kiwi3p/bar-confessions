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
      <div className="flex flex-col pt-10 font-mono text-white h-screen w-screen art-bar-bg overflow-hidden">
        <div className="flex flex-col justify-center self-center">
          <h1 className="site-title uppercase text-2xl">Bar Confessions</h1>
          <h2 className=" uppercase text-large">
            Go to https://www.bar-confessions.com <br />
            to confess your sins
          </h2>
        </div>
        <div className="relative z-20">

        <DataRead />
        </div>
        <div className="absolute top-48 z-10 flex flex-row justify-center self-center h-screen w-screen px-5">
          <img
            className="px-5 w-24"
            src="assets/img/palmtree.svg"
            alt="palm tree"
          />
          <img
            className="px-5 w-20"
            src="assets/img/palmtreev2.svg"
            alt="palm tree"
          />
          <img
            className="px-5 w-24"
            src="assets/img/palmtree.svg"
            alt="palm tree"
          />
          <img
            className="px-5 w-20"
            src="assets/img/palmtreev2.svg"
            alt="palm tree"
          />
          <img
            className="px-5 w-24"
            src="assets/img/palmtree.svg"
            alt="palm tree"
          />
          <img
            className="px-5 w-20"
            src="assets/img/palmtreev2.svg"
            alt="palm tree"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Data;
