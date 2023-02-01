import React, { Component } from 'react';
// import axios from "axios";
import { getAllBoards, createBoards } from '../Api';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      boards: "",
      currentBoard: [],
      model: false
    }
  }
  componentDidMount() {
    getAllBoards()
      .then((res) => {
        console.log(res);
        this.setState((prevState) => {
          return ({
            ...prevState,
            currentBoard: res,
            model: false
          })
        })
      });
  }

  createBoard() {
    this.setState((prevState) => {
      return ({
        ...prevState,
        model: true
      })
    });
  }
  CloseModel() {
    this.setState((prevState) => {
      return ({
        ...prevState,
        model: false
      })
    });
  }
  setBoardTitle(event) {
    if (event.target.elements.Board.value) {
      createBoards(event.target.elements.Board.value)
        .then((res) => {
          console.log(res);
          this.setState((prevState) => {
            return ({
              ...prevState,
              currentBoard: [...prevState.currentBoard, res],
              model: false
            })
          })
        });
    }
    event.target.elements.Board.value = "";
    event.preventDefault();
  }
  render() {
    return (
      <>
        <div className="home">
          {this.state.currentBoard.map((board, index) => {
            return (
              <a href={`/${board.id}`} key={index}>
                <div className="board">
                  <h1>{board.name}</h1>
                </div>
              </a>
            )
          })}
          <div className="create-board" onClick={() => { this.createBoard() }}>
            <p>Create New Board</p>
          </div>
        </div>
        <div className="model" style={this.state.model ? { display: "flex" } : { display: "none" }}>
          <div className="create-model-title">
            <h1>Create a Board</h1>
            <form onSubmit={(event) => { this.setBoardTitle(event) }}>
              <input type="text" name="Board" placeholder="Enter Board Name" />
              <button onClick={() => { this.CloseModel() }}>Close</button>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}