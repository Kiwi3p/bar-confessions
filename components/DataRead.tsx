import axios from "axios";
import { useEffect, useState } from "react";

const DataRead = () => {
  const [tasks, setTasks] = useState<Array<any>>([]);
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function fetchData() {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`)
      .then((res) => {
        console.log(res);
        setTasks(res.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div id="list-wrapper">
      <div className=" p-10 task-wrapper flex-wrapper">
        <h2 className="font text-2xl">testing prompt response</h2>
        <div className="prompt-container">
          <h1 className="text-xl bar-text-color">
            {" "}
            <span>testing 1234</span>
          </h1>
        </div>
      </div>
      <div className=" p-10 task-wrapper flex-wrapper">
        <h2 className="font text-2xl">testing prompt response</h2>
        <div className="prompt-container">
          <h1 className="text-xl bar-text-color">
            {" "}
            <span>testing 1234</span>
          </h1>
        </div>
      </div>
      <div className=" p-10 task-wrapper flex-wrapper">
        <h2 className="font text-2xl">testing prompt response</h2>
        <div className="prompt-container">
          <h1 className="text-xl bar-text-color">
            {" "}
            <span>testing 1234</span>
          </h1>
        </div>
      </div>
      <div className=" p-10 task-wrapper flex-wrapper">
        <h2 className="font text-2xl">testing prompt response</h2>
        <div className="prompt-container">
          <h1 className="text-xl bar-text-color">
            {" "}
            <span>testing 1234</span>
          </h1>
        </div>
      </div>

      {/* {tasks.map(function (task, index) {
        return (
          <>
            {index < 4 ? (
              <div key={index} className=" p-10 task-wrapper flex-wrapper">
                <h2 className="font text-2xl">{task.prompt}</h2>
                <div className="prompt-container">
                  <h1 className="text-xl bar-text-color">
                    {" "}
                    <span>{task.answer}</span>
                  </h1>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })} */}
    </div>
  );
};

export default DataRead;
