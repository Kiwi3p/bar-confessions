import React from "react";
import PostModal from "./PostModal";
import questions from "../data/questions.json";
import { withRouter, NextRouter } from "next/router";

interface WithRouterProps {
  router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

class AddTutorial extends React.Component<MyComponentProps, any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editPrompt: true,
      prompt: null,
      todoList: [],
      questionList: [],
      activeItem: {
        answer: "",
        prompt: "loading...",
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePromptChange = this.handlePromptChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }

  getCookie(name: any) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async componentDidMount() {
    this.fetchTasks();
    this.fetchQuestions();
    setTimeout(() => {
      this.setPrompt();
      this.commitPrompt();
    }, 500);
  }

  async reconfigurePrompt() {
    this.fetchTasks();
    this.fetchQuestions();
    // await this.setPrompt();
    // await this.commitPrompt();
  }

  fetchTasks() {
    console.log("Fetching tasks...");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todoList: data,
        })
      );
  }

  fetchQuestions() {
    console.log("Fetching questions...");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/question-list/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          questionList: data,
        });
      });
  }

  handleChange(e: any) {
    var name = e.target.name;
    var value = e.target.value;
    console.log("Name:", name);
    console.log("Value:", value);

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        answer: value,
      },
    });
  }

  handlePromptChange(e: any) {
    var prompt = e.target.answer;
    var value = e.target.value;
    console.log("Prompt:", prompt);
    console.log("Value:", value);

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        prompt: value,
      },
    });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("ITEM:", this.state.activeItem);

    var csrftoken = this.getCookie("csrftoken");

    var url = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-create/`;

    if (this.state.editing == true) {
      url = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing: false,
      });
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      } as any,
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        this.fetchTasks();
        this.setState({
          activeItem: {
            answer: "",
            prompt: ``,
          },
        });
        this.reconfigurePrompt();
        {
          this.props.router.push("/success");
        }
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  }

  startEdit(task: any) {
    this.setState({
      activeItem: task,
      editing: true,
    });
  }

  getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  setPrompt() {
    function getRandomInt(min: any, max: any) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    this.setState({
      prompt: getRandomInt(0, this.state.questionList.length),
    });
  }

  commitPrompt() {
    // this.setPrompt();
    // if (this.state.questionList[this.state.prompt] === null) {
    //   return null
    // }
    setTimeout(() => {
      // this.setPrompt();
      // this.commitPrompt();

      console.log(
        "array find",
        this.state.questionList[this.state.prompt].question
      );

      this.setState({
        activeItem: {
          prompt: this.state.questionList[this.state.prompt].question,
          // prompt: this.state.prompt,
        },
      });
    }, 500);
  }

  editPrompt() {
    this.setState({
      editPrompt: false,
    });
  }

  render() {
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <div>
              {this.state.editPrompt ? (
                <h1 className="text-2xl">
                  {/* {questions[this.state.prompt].question} */}
                  {this.state.activeItem.prompt}
                </h1>
              ) : (
                <input
                  onChange={this.handlePromptChange}
                  className="form-control text-black"
                  maxLength={100}
                  id="prompt"
                  defaultValue={questions[this.state.prompt].question}
                  value={this.state.activeItem.prompt}
                  type="text"
                  name="prompt"
                  placeholder="Add task.."
                />
              )}
              {/* <h1 className="text-4xl">
                {questions[this.state.prompt].question}
              </h1> */}
              {/* <button onClick={() => this.setPrompt()}>Change prompt</button> */}
              <button className="bar-yellow" onClick={() => this.editPrompt()}>
                Edit Prompt
              </button>
            </div>
            <br />
            <br />
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div className="">
                  <textarea
                    onChange={this.handleChange}
                    className="form-control answer-box text-black"
                    id="answer"
                    maxLength={280}
                    value={this.state.activeItem.answer}
                    name="answer"
                    placeholder="Add answer.."
                  />
                </div>
                <div>
                  <input
                    id="submit"
                    className="btn btn-warning submit-button"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    );
  }
}

export default withRouter(AddTutorial);
