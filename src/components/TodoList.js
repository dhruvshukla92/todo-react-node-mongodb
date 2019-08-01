import React, { Component } from "react";

import axios from "axios";

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      upadatedTodo: {},
      error: null,
      editable: false,
      idToEdit: null,
      isLoading: true,
      doneAlert: false
    };
  }

  getTodos = () => {
    axios
      .get("http://localhost:4000/todos")
      .then(res => {
        this.setState({
          isLoading: false,
          todos: res.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: err
        });
      });
  };

  deleteTodo = todoId => {
    axios.delete(`http://localhost:4000/todos/delete/${todoId}`).then(res => {
      console.log(res.data);
      this.getTodos();
    });
  };
  handleEdit = (todo, e) => {
    console.log(todo._id);

    this.setState({
      editable: true,
      idToEdit: todo._id,
      upadatedTodo: todo
    });
  };
  updateTodo = () => {
    console.log("update todo clicked");

    const { _id } = this.state.upadatedTodo;
    console.log(_id);
    if (this.state.updateTodo === {}) {
      this.setState({
        error: "Some error occured!! Please try reloading again."
      });
    } else {
      axios
        .post(
          `http://localhost:4000/todos/update/${_id}`,
          this.state.upadatedTodo
        )
        .then(res => {
          console.log(res.data);
          this.setState({ editable: false, doneAlert: true, upadatedTodo: {} });
          this.getTodos();
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }
  };
  handleDataUpadate = e => {
    console.log("handle data clicked");
    const { name, value } = e.target;
    console.log(name+" : "+value);
    this.setState({
      upadatedTodo: {
        ...this.state.upadatedTodo,
        [name]: value
      }
    });
  };
  handleCancel = () => {
    this.setState({
      editable: false,
      idToEdit: null
    });
  };

  handleDelete = (id, e) => {
    this.deleteTodo(id);
  };
  closeNotification = () => {
    this.setState({ doneAlert: false });
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.getTodos();
    }, 2000);
  };

  render() {
    const { todos, error, upadatedTodo } = this.state;
    // console.log(todos);
    const tableData =
      todos &&
      todos.length > 0 &&
      todos.map((todo, i) => {
        return this.state.editable ? (
          todo._id === this.state.idToEdit ? (
            <TodoEditable
              todo={upadatedTodo}
              key={i}
              updateTodo={this.updateTodo}
              handleCancel={this.handleCancel}
              handleDataUpadate={this.handleDataUpadate}
            />
          ) : (
            <Todo
              todo={todo}
              key={i}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          )
        ) : (
          <Todo
            todo={todo}
            key={i}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        );
      });
    if (error) {
      return (
        <div>
          <h4 style={{ textAlign: "center", margin: "20px" }}>Todo List</h4>
          <p>Error: {error.message || error}</p>
        </div>
      );
    } else {
      return (
        <div className="todoList">
          <h4 style={{ textAlign: "center", margin: "20px" }}>Todo List</h4>
          {this.state.isLoading && (
            <div style={{ width: "200px", margin: "auto" }}>
              <div className="spinner-grow text-primary"> </div>
              <div className="spinner-grow text-success" />
              <div className="spinner-grow text-info" />
              <div className="spinner-grow text-warning" />
              <div className="spinner-grow text-danger" />
              <div className="spinner-grow text-secondary" />
              <p>loading...</p>
            </div>
          )}
          {this.state.doneAlert && (
            <div className="alert alert-success alert-dismissible fade show">
              <button
                type="button"
                onClick={this.closeNotification}
                className="close"
              >
                &times;
              </button>
              <strong>Todo Updated successfully!!</strong>
            </div>
          )}

          {todos && todos.length > 0 ? (
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
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

const Todo = props => {
  return (
    <tr>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {" "}
        {props.todo.todo_description}{" "}
      </td>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {" "}
        {props.todo.todo_responsible}{" "}
      </td>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {" "}
        {props.todo.todo_priority}{" "}
      </td>
      <td>
        {/* <Link to={'/edit/'+props.todo._id}> */}
        <button
          type="button"
          className="btn btn-info btn-sm"
          onClick={e => props.handleEdit(props.todo, this)}
        >
          Edit
        </button>
        &nbsp; &nbsp;
        <button
          className="btn btn-info btn-sm"
          onClick={e => props.handleDelete(props.todo._id, e)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const TodoEditable = props => {
  return (
    <tr style={{ backgroundColor: "#c6e8f5" }}>
      <td>
        <input
          type="text"
          className="form-control"
          name="todo_description"
          value={props.todo.todo_description}
          onChange={props.handleDataUpadate}
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          name="todo_responsible"
          value={props.todo.todo_responsible}
          onChange={props.handleDataUpadate}
        />
      </td>
      <td>
        <div class="form-group">
          <select class="form-control" 
          name="todo_priority" 
          onChange={props.handleDataUpadate}
          value={props.todo.todo_priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* <input
          type="text"
          name="todo_priority"
          value={props.todo.todo_priority}
          
        /> */}
      </td>
      <td>
        <button className="btn btn-info btn-sm" onClick={props.updateTodo}>
          Save
        </button>{" "}
        &nbsp; &nbsp;
        <button className="btn btn-warning btn-sm" onClick={props.handleCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
