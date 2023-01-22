import React ,{Component} from 'react';
import { useParams } from "react-router-dom";
export default function BoardList(){
  let param = useParams();
  return(<List List={param.list}/>)
}
class List extends Component{
  constructor(props){
    super(props);
     this.state = {
       data:{},
       key:"",
       model:false,
       secondModel:false
    }
    
  }
  componentDidMount(){
    let data = JSON.parse(localStorage.getItem(this.props.List));
    if(data){
      // console.log(data);
      this.setState((prevState)=>{
        return {
          ...prevState,
          data:data
        }
      
      })
    }
  }
  CloseModel(event){
    this.setState({model:false,secondModel:false})
    event.preventDefault();
  }
  AddList(){
  this.setState(
    {
      model:true
    }
  );
}
  setTitle(event){
    let title =  event.target.elements.title.value;
    console.log(title);
    this.setState((prevState) => {
      console.log(prevState);
   return ({
      data: {
         ...prevState.data,
        [title]: [],
      },
      model:false
    })}
  );
    event.target.elements.title.value="";
    event.preventDefault();
  }
  AddCards(key){
    this.setState(
    {
      key:key,
      secondModel:true
    }
  );
  }
  setCard(event){
     let card = event.target.elements.card.value ;
    console.log(card);
    this.setState((prevState) => {
      console.log(prevState);
   return ({
      data: {
         ...prevState.data,
        [prevState.key]: [...prevState.data[prevState.key],card],
      },
      model:false,
      secondModel:false
    })}
  );
    event.target.elements.card.value="";
    event.preventDefault();
    localStorage.setItem(this.props.List,JSON.stringify(this.state.data));
  }
  render(){
    return(
      <>
        <div className="add-list">
          {Object.keys(this.state.data).map((key,index) => {
        return (
          <div key={index} className="list-item">
            <h1>{key}</h1>
            {this.state.data[key].map((card,index) => {return <p>{card}</p>})}
            <button onClick={()=>{this.AddCards(key)}}>Add a Card</button>
          </div>
          )
      })
      }
      <div className="board-list" onClick={()=>{this.AddList()}}>
        <h1>+Add Onther List</h1>
      </div>
     </div>
         <div className="model" style={this.state.model ? { display: "flex" } : { display: "none" }}>
          <div className="create-model-title">
            <form onSubmit={(event) => { this.setTitle(event) }}>
              <input type="text" name="title" placeholder="Enter List Title" onInput={(event) => { this.handleOnChange(event.target.value) }} />
              <button onClick={(event) => { this.CloseModel(event) }}>Close</button>
              <button type="submit">Add List</button>
            </form>
          </div>
        </div>
         <div className="second-model" style={this.state.secondModel ? { display: "flex" } : { display: "none" }}>
          <div className="create-second-model-title">
            <h1>Create a Card</h1>
            <form onSubmit={(event) => { this.setCard(event) }}>
              <input type="text" name="card" placeholder="Enter List Title" onInput={(event) => { this.handleOnChange(event.target.value) }} />
              <button onClick={(event) => { this.CloseModel(event) }}>Close</button>
              <button type="submit">Add Card</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}