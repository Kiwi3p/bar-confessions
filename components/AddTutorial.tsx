import React from "react";
import PostModal from "./PostModal";
import questions from "../data/questions.json";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editPrompt: true,
      prompt: 0,
      todoList: [],
      activeItem: {
        answer: "",
        prompt: ``,
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
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

  componentDidMount() {
    this.fetchTasks();
    this.setPrompt();
  }

  fetchTasks() {
    console.log("Fetching...");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/task-list/`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todoList: data,
        })
      );
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

    var url = "http://127.0.0.1:8000/api/task-create/";

    if (this.state.editing == true) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
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
      prompt: getRandomInt(0, questions.length),
    });
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
                <h1 className="text-4xl">
                  {questions[this.state.prompt].question}
                </h1>
              ) : (
                <input
                  onChange={this.handlePromptChange}
                  className="form-control"
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

export default App;
