import React from 'react';
 export default class Header extends React.Component {
   render(){
     return (
       <div className="header">
         <h1 className='title-name'>Trello</h1>
         <ul>
           <li className='list-item-title'>Workspace</li>
           <li className='list-item-title'>Trello</li>
           <li className='list-item-title'>Trello</li>
           <li className='list-item-title'>Trello</li>
           </ul>
         <button>Create</button>
       </div>
     )
   }
 }