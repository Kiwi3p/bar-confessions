import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";

const User: NextPage = () => {
  

  

  return (
    <div>
      
      <div>
        <AddTutorial />
      </div>
      {/* <PostModal /> */}
      {/* <DataRead />  */}
    </div>
  );
};

export default User;
