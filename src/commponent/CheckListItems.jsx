import React, { Component } from 'react';
import { getCheckItems, createCheckItems, deleteCheckItems } from '../Api';
export default class CheckListItems extends Component {
  constructor() {
    super();
    this.state = {
      CheckListItems: []
    }
  }
  componentDidMount() {
    getCheckItems(this.props.id).then((res) => {
      console.log(res)
      this.setState((prevState) => {
        return (
          { ...prevState, CheckListItems: res }
        )
      })
    })
  }
  createItems(event) {
    let name = event.target.elements[0].value;
    console.log(this.props.id);
    
    createCheckItems(this.props.id, name).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return (
          { ...prevState, CheckListItems: [...prevState.CheckListItems, res] }
        )
      })
    })
    event.target.elements.item.value = "";
    event.preventDefault();
  }
  deleteItem(itemId){
    deleteCheckItems(this.props.id,itemId).then(()=>{
      this.setState((prevState)=>{
        return (
          {...prevState,CheckListItems:this.state.CheckListItems.filter(item=>item.id!==itemId)}
        )
      })
    })
  }
  render() {
    return (
      <div>
        {this.state.CheckListItems.map((item) => {
          return (
            <>
              <div className='items'>
                <p>{item.name} </p>
                <button onClick={()=>{this.deleteItem(item.id)}}>delete</button>
              </div>
            </>
          )
        })}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          add items
        </button>
        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <form onSubmit={(event) => { this.createItems(event) }}>
                <div className="modal-body">
                  <input type='text' name='item' />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}