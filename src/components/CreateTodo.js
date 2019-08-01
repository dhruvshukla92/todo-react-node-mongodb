import React, { Component } from "react";
// import {history} from 'react-router-dom'
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo:{
        todo_description: "",
        todo_responsible: "",
        todo_priority: "",
        todo_completed: false
      },
      doneAlert:false
    };
  }
  handleChange = e => {
   
    this.setState({
      todo:{...this.state.todo,
        todo_description: e.target.value
      }
      
    });
  };
  handleResponsibleChange = e => {
    this.setState({
      todo:{...this.state.todo,
      todo_responsible: e.target.value
      }
    });
  };
  handlePriority = e => {
    this.setState({
      todo:{...this.state.todo,
      todo_priority: e.target.value
      }
    });
  };
  closeNotification=()=>{
    this.setState({doneAlert:false})
  }
  handleSubmit = (e) => {
    e.preventDefault();
      console.log("form submitted");
      // console.log(this.state);
      const newTodo=this.state.todo;
      console.log(newTodo);
      axios.post('http://localhost:4000/todos/add',newTodo)
      .then(res=>{
        console.log(res.data)
        this.setState({doneAlert:true})
        // setTimeout(() => {
        //   this.props.history.push("/")
        // }, 2000);
       
      });

    this.setState({ todo:{
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: false
    },
     doneAlert:false
    });
  };

componentDidUpdate(prevProps, prevState) {
  
}


  render() {
  
    return (
      <div>
        <h4 style={{textAlign:"center",margin:"20px"}}>Create Todo</h4>
        {console.log(this.state.doneAlert)}
       {this.state.doneAlert &&  <div className="modal fade" id="myModal" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Todo added successfully!! </h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            </div>
        </div>
      </div>}
      { this.state.doneAlert && 
        <div class="alert alert-success alert-dismissible fade show">
        <button type="button" onClick={this.closeNotification} class="close" >&times;</button>
        <strong>Todo added successfully!!</strong> 
      </div>
      }
     
        <form>
          <div className="form-group">
            <label>To do Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="todo"
              value={this.state.todo.todo_description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Responsible</label>
            <input
              type="text"
              className="form-control"
              placeholder="responsibility"
              value={this.state.todo.todo_responsible}
              onChange={this.handleResponsibleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="lowPriority"
                value="Low"
                checked={this.state.todo.todo_priority === "Low"}
                onChange={this.handlePriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="medium"
                value="Medium"
                checked={this.state.todo.todo_priority === "Medium"}
                onChange={this.handlePriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="high"
                value="High"
                checked={this.state.todo.todo_priority === "High"}
                onChange={this.handlePriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <button className="btn btn-info" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        {this.state.doneAlert?alert:''}
      </div>
    );
  }
}
