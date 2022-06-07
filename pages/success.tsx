import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";
import Layout from "../components/wrappers/Layout";
import Link from "next/link";

const Success: NextPage = () => {
  return (
    <Layout title="data">
      <div className="flex flex-col font-mono text-white h-screen w-screen art-bar-bg overflow-hidden">
        <div className="flex flex-col  items-center">
          <h1 className="text-2xl p-7">
            Thank you for confessing your sins! Priests don’t tell... but we do!
            <br />
            Check the screen
          </h1>
          <div>
            <Link href="/">
              <button className="btn btn-warning submit-button">
                Answer Another
              </button>
            </Link>
            <Link href="/add-question">
              <button className="btn btn-warning question-button">
                Ask a question
              </button>
            </Link>
          </div>
          <div className="flex flex-row absolute bottom-0 overflow-hidden">
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
        </div>
      </div>
    </Layout>
  );
};

export default Success;
