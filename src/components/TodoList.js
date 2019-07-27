import React, { Component } from "react";

import axios from "axios";

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      error:null,
      editable:false,
      isLoading:true
    };
  }

  getTodos = () => {
    axios.get("http://localhost:4000/todos").then(res => {
      
      this.setState({
        isLoading:false,
        todos: res.data
      });
    })
    .catch(err=>{
      console.log(err)
      
      this.setState({
        isLoading:false,
        error:err
      })
    })
  };

  deleteTodo=(todoId)=>{
    console.log(todoId);
    axios.delete(`http://localhost:4000/todos/delete/${todoId}`)
    .then(res=>{
      console.log(res.data)
      this.getTodos();
    })
    
  }
  handleDelete=(id,e)=>{
    console.log(id);
    this.deleteTodo(id);
   

  }
  componentDidMount = () => {
    setTimeout(() => {
      this.getTodos();
    }, 2000);
    
   
  };

  render() {
    const { todos,error } = this.state;
    console.log(todos)
    console.log(error)
    const tableData =
      todos &&
      todos.length > 0 &&
      todos.map((todo,i) => {
        return (
          <Todo todo={todo} key={i} handleDelete={this.handleDelete} />
        );
      });
      if (error) {
        return(
          <div>
             <h4 style={{textAlign:"center",margin:"20px"}}>Todo List</h4>
        
            <p>
            Error: {error.message}
            </p>
          </div>
        )
      }else{

      

    return (
      <div className="todoList">
        <h4 style={{textAlign:"center",margin:"20px"}}>Todo List</h4>
        {this.state.isLoading && (<div style={{width:"200px", margin:"auto"}}>
        <div  class="spinner-grow text-primary"> </div>
        <div class="spinner-grow text-success"></div>
        <div class="spinner-grow text-info"></div>
        <div class="spinner-grow text-warning"></div>
        <div class="spinner-grow text-danger"></div>
        <div class="spinner-grow text-secondary"></div>
        </div>) }
        {todos && todos.length>0?(
          <table className="table ">
          <thead className="thead-light">
            <tr>
              <th> Description </th>
              <th> Responsible </th>
              <th> Priority </th>
              <th> Options </th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      
          ):(<p>No data Found!!</p>)
        } 
           
        
       
       
        
      </div>
    );
  }
}
}

const Todo=(props)=>{
return(
    <tr >
            <td className={props.todo.todo_completed?'completed':''}> {props.todo.todo_description} </td>
            <td className={props.todo.todo_completed?'completed':''}> {props.todo.todo_responsible} </td>
            <td className={props.todo.todo_completed?'completed':''}> {props.todo.todo_priority} </td>
            <td > 
              {/* <Link to={'/edit/'+props.todo._id}> */}
              <button type="button" className={props.todo.todo_completed?'btn btn-info btn-sm disabled':'btn btn-info btn-sm'}>Edit</button> 
              {/* </Link>  */}
              &nbsp; &nbsp;
              <button className="btn btn-info btn-sm" onClick={(e)=>props.handleDelete(props.todo._id,e)}> Delete</button>
             </td>
          </tr>
)
}