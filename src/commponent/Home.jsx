import React, { Component } from 'react';
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
    console.log("Home component mounted");
    const boards = JSON.parse(localStorage.getItem('board-title'));
    if (boards) {
      this.setState((prevState) => {
        return ({
          ...prevState,
          currentBoard: [...boards],
          model: false
        })
      });
    }
  }
  handleOnChange(changeTitle) {
    this.setState((prevState) => {
      return ({ ...prevState, boards: changeTitle });
    });
    // console.log(this.state);
  }
  createBoard() {
    this.setState({
      boards: [...this.state.boards],
      model: true
    })
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
      const { boards, currentBoard } = this.state;
      localStorage.setItem('board-title', JSON.stringify([...currentBoard, boards]));
      this.setState((prevState) => {
        return ({ ...prevState, model: false })
      })
    }else{
      console.log("no board selected");
    }
    event.target.elements.Board.value = "";
    event.preventDefault();
    this.componentDidMount();
  }
  render() {
    return (
      <>
        <div className="home">

          {this.state.currentBoard.map((board, index) => {
            return (
              <a href={`/${board}`}>
              <div className="board" key={index}>
                <h1>{board}</h1>
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
              <input type="text" name="Board" placeholder="Enter Board Name" onInput={(event) => { this.handleOnChange(event.target.value) }} />
              <button onClick={() => { this.CloseModel() }}>Close</button>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}