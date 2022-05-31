import type { NextPage } from "next";
import questions from "../data/questions.json";
import { useEffect, useState } from "react";
import PostModal from "../components/PostModal";
import axios from "axios";
import AddTutorial from "../components/AddTutorial";
import DataRead from "../components/DataRead";

const Data: NextPage = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
      fetchData();
  
    }, []);
  
    function fetchData() {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`)
        .then((res) => {
            console.log(res);
        //   setTasks(res.data);
        })
        .catch((error) => console.error(error));
    }

  return (
    <div>
      {/* <DataRead /> */}
    </div>
  );
};

export default Data;
