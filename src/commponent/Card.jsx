import React, { Component } from 'react';
import { getCard, createCard, deleteCard, getChecklist, deleteCheckList, createCheckList } from '../Api';
import  CheckListItems  from './CheckListItems';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardName: "",
      cardId: '',
      checkLists: [],
      model: false,
      secondModel: false,
      checkListModel: false
    }
  }
  componentDidMount() {
    getCard(this.props.id).then((res) => {
      // console.log(res);
      this.setState((prevState) => {
        return (
          { ...prevState, cards: res })
      })
    });
  }
  AddCards() {
    this.setState((prevState) => {
      return (
        { ...prevState, model: true })
    })
  }
  CloseModel(event) {
    this.setState({ model: false, secondModel: false, checkListModel: false })
    // event.preventDefault();
  }
  setCardTitle(event) {
    let cardName = event.target.elements.card.value;
    if(!cardName===''){
      createCard(this.props.id, cardName).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return (
          { ...prevState, cards: [...prevState.cards, res], model: false })
      })
    })
    }
    
    event.target.elements.card.value = '';
    event.preventDefault();
  }
  deleteCard(id) {
    console.log(id);
    deleteCard(id).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return (
          { ...prevState, cards: prevState.cards.filter(card => card.id != id) })
      })
    })
  }
  saveCard(name, id) {
    getChecklist(id).then((res) => {
      console.log(res);
      this.setState((prevState) => {
        return (
          { ...prevState, secondModel: true, cardName: name, cardId: id, checkLists: res })
      })
    })
  }
  checkListModel() {
    this.setState((prevState) => {
      return (
        { ...prevState, checkListModel: true })
    })
  }
  closeAddList() {
    this.setState((prevState) => {
      return (
        { ...prevState, checkListModel: false })
    })
  }
  addCheckList(event) {
    let name = event.target.elements.checklist.value;
    createCheckList(this.state.cardId, name).then((res) => {
      this.setState((prevState) => {
        return (
          { ...prevState, checkLists: [...prevState.checkLists, res] }
        )
      })
    })
    event.target.elements.checklist.value = "";
    event.preventDefault();
  }
  deleteCheckList(id) {
    deleteCheckList(id).then(() => {

      this.setState((prevState) => {
        return (
          { ...prevState, checkLists: prevState.checkLists.filter(list => list.id !== id) }
        )
      })
    })
  }
  render() {
    // console.log(this.state.cards);
    return (
      <>
        <div className="all-card">
          {this.state.cards.length > 0 && this.state.cards.map((card, index) => {
            return (
              <div className="card-item" key={index}>
                <p onClick={() => { this.saveCard(card.name, card.id) }}>{card.name}</p>
                <p id="delete" onClick={() => { this.deleteCard(card.id) }}>delete</p>
              </div>
            )
          })}
          <button onClick={() => { this.AddCards() }}>Add a Card</button>
        </div>
        <div className="model" style={this.state.model ? { display: "flex" } : { display: "none" }}>
          <div className="create-model-title">
            <h1>Create a Card</h1>
            <form onSubmit={(event) => { this.setCardTitle(event) }}>
              <input type="text" name="card" placeholder="Enter card Name" />
              <button onClick={(event) => { this.CloseModel(event) }}>Close</button>
              <button type="submit">+Add Card</button>
            </form>
          </div>
        </div>
        <div className="card-model" style={this.state.secondModel ? { display: "flex" } : { display: "none" }}>
          <div className="card-model-item">
            <p id='title'>{this.state.cardName}</p>
            <p className='close' onClick={() => { this.CloseModel() }}>Close</p>
            <div className="action">
              <p>Action</p>
              <button>Archive</button>
            </div>
            <div className="Add-CheckList">
              <p>Add to Card</p>
              <button onClick={() => { this.checkListModel() }}>CheckList</button>
            </div>
            {this.state.checkLists.length > 0 ? this.state.checkLists.map((checkList, index) => {
              return (
                <div key={index} className="checkList">
                  <hr />
                  <p>{checkList.name}</p>
                  <button className='deleteCheckList' onClick={() => { this.deleteCheckList(checkList.id) }}>delete</button>
                  <CheckListItems id={checkList.id} />
                  
                </div>
              )
            }) : null}
          </div>
          <div className='add-checklist' style={this.state.checkListModel ? { visibility: " " } : { display: "none" }}>
            <p>Add CheckList<span onClick={() => { this.closeAddList() }}>Close</span></p>
            <p>Title</p>
            <form onSubmit={(event) => { this.addCheckList(event) }}>
              <input type='text' name='checklist' />
              <button type='submit'>Add</button>
            </form>
          </div>
        </div>

      </>
    )
  }
}