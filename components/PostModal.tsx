import questions from "../data/questions.json";
import { useEffect, useState } from "react";

const PostModal = () => {
  const [prompt, setPrompt] = useState(0);

  function getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  useEffect(() => {
    setPrompt(getRandomInt(0, questions.length));
  });

  return (
    <div>
      <button onClick={() => setPrompt(getRandomInt(0, questions.length))}>
        Change prompt
      </button>
      <h1 className="text-4xl">{questions[prompt].question}</h1>
    </div>
  );
};

export default PostModal;
