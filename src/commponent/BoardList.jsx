import React, { Component } from 'react';
import { getList, createList, deleteList} from '../Api';
import { useParams } from "react-router-dom";
import Card from './Card'
export default function BoardList() {
  let param = useParams();
  return (<List List={param.list} />)
}
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      model: false
    }

  }
  componentDidMount() {
    getList(this.props.List)
      .then((res => {
        // console.log(res);
        this.setState((prevSatate) => {
          return ({ ...prevSatate, data: res })
        })
      }))
  }
  CloseModel(event) {
    this.setState({ model: false })
    event.preventDefault();
  }
  AddList() {
    this.setState({ model: true });
  }
  setTitle(event) {
    let name = event.target.elements.title.value;
    // console.log(name);
    createList(this.props.List, name)
      .then((res) => {
        this.setState((prevState) => {
          return ({ ...prevState, data: [...prevState.data, res], model: false  })
        })
      })
    event.target.elements.title.value = '';
    event.preventDefault();
  }
deleteList(list) {
  // console.log(list.id,list.name);
  deleteList(list.id,true).then((res) => {
    console.log(res);
    this.setState((prevState) => {
      return ({...prevState, data: prevState.data.filter(item => item.id!== list.id && item.name!== list.name)})
    })
  })
}
  render() {
    return (
      <>
        <div className="add-list">
          {this.state.data.map((list, index) => {
        // console.log(list);
            return (
              <div key={index} className="list-item">
                <p>{list.name}</p>
                <p className='delete' onClick={()=>{this.deleteList(list)}}>delete</p>
                <Card id={list.id} />
              </div>
            )
          })
          }

          <div className="board-list" onClick={() => { this.AddList() }}>
            <p id='addList'>+Add Onther List</p>
          </div>
        </div>
        <div className="model" style={this.state.model ? { display: "flex" } : { display: "none" }}>
          <div className="create-model-title">
            <form onSubmit={(event) => { this.setTitle(event) }}>
              <input type="text" name="title" placeholder="Enter List Title" />
              <button onClick={(event) => { this.CloseModel(event) }}>Close</button>
              <button type="submit">Add List</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}