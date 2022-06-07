import React from "react";
// import PostModal from "./PostModal";
import questions from "../data/questions.json";
import { withRouter, NextRouter } from "next/router";

class AddQuestion extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        question: "",
      },
      editing: false,
      questionCount: 0,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    await this.setPrompt();
    await this.commitPrompt();
  }

  async reconfigurePrompt() {
    this.fetchTasks();
    await this.setPrompt();
    await this.commitPrompt();
  }

  fetchTasks() {
    console.log("Fetching...");

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/question-list/`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          todoList: data,
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
        question: value,
      },
      questionCount: e.target.value.length,
    });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("ITEM:", this.state.activeItem);

    var csrftoken = this.getCookie("csrftoken");

    var url = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/question-create/`;

    if (this.state.editing == true) {
      url = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/api/question-update/${this.state.activeItem.id}/`;
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
            question: "",
          },
        });
        this.reconfigurePrompt();
        {
          this.props.router.push("/question-success");
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
      prompt: getRandomInt(0, questions.length),
    });
  }

  commitPrompt() {
    this.setState({
      activeItem: {
        prompt: questions[this.state.prompt].question,
      },
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
              <h1 className="text-4xl">Add your question</h1>
            </div>
            <br />
            <br />
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div className="">
                  <textarea
                    onChange={this.handleChange}
                    className="form-control answer-box text-black"
                    id="question"
                    maxLength={50}
                    value={this.state.activeItem.question}
                    name="question"
                    placeholder="Add question.."
                  />
                  {this.state.questionCount}/50
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

export default withRouter(AddQuestion);
