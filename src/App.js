import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <Router>
      <div className="container">
        
        <div
          className="row"
          style={{
            backgroundColor: "#c6e8f5",
           
            borderRadius: "12px",
            padding:"5px"
          }}
        >
          <div className="col" style={{textAlign:"center"}}>
          <h2 style={{ textAlign: "center",color:"" }}>To Do App</h2>
          </div>
          <div className="col" style={{textAlign:"center"}}>
            <Link to="/">ToDos </Link>
          </div>
          <div className="col" style={{textAlign:"center"}}>
            <Link to="/create">Create ToDo </Link>
          </div>
          <div className="col" style={{textAlign:"center"}}>
            <Link to="/edit:id">Edit ToDo </Link>
          </div>
        </div>
        <Route path="/" exact component={TodoList} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/edit" component={EditTodo} />
      </div>
    </Router>
  );
}

export default App;
