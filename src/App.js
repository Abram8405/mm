import React, { Component, useState, useEffect } from 'react';
import uuid from 'react-uuid';

import  AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import TodoFooter from './components/TodoFooter';

import style from './style.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            todos: [],
            filter: 'all',
        }
    }

    handleChange = (id) => {

        this.setState((prevState) => {
            const todos = prevState.todos.map(todo => {
                if(id === todo.id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo;

            });

            return { todos }
        });
    };

    setEditedTodo = (title, id ) => {
        if(title === '') {
            return
        }
        this.setState((prevState) => {
            const  edited = prevState.todos.map(todo => {
                if(id === todo.id) {

                    return {
                        ...todo,
                        title: title
                    }
                }

                return todo
            });

            return {todos: edited}
        })
    };

    addTodo = (title) => {

        const newTodo = {
            id:uuid(),
            title,
            completed: false
        };

        this.setState({todos:[...this.state.todos, newTodo]});
    };

    handleDelete = (id) => {
        this.setState(() => {
            const filteredTodos = this.state.todos.filter(todo => {
                return id !== todo.id ? todo : null;
            });

            return {todos: filteredTodos};
        })
    };

    setFilter = (newFilter) => {
        this.setState({filter: newFilter})
    };

    filterTodos = (filter) => {

        const {todos} = this.state;

        if(filter === "completed") {

            return (
                todos.filter(todo => {
                    if(todo.completed) {
                       return todo
                    }
                })
            )
        }
        if(filter === "active") {

            return (todos.filter(todo => {
                    if (!todo.completed) {
                        return todo
                    }
                })
            )
        }

        return todos;
    };

    clearCompleted = () => {

        this.setState(() => {
             const allActive = this.state.todos.filter(todo => {
                if(!todo.completed) {
                    return  todo;
                }
            });

            return {todos: allActive}
        });
    };

    toggleAll = () => {

        let checked = [], unChecked = [], allChecked = false;
        this.setState(prevstate => {
            const toggle = this.state.todos.forEach(todo => {
                if(!todo.completed) {
                    allChecked = true;
                }
                checked.push({...todo, completed: true });
                unChecked.push({...todo, completed: false })
            });
            return allChecked ?  {todos: checked} : {todos: unChecked};

        })
    };

    componentDidMount() {
        const todos =  JSON.parse(localStorage.getItem("todos")) || [];

        this.setState({todos});

        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            localStorage.setItem("todos", JSON.stringify(this.state.todos));
        });
    }

    render() {

        const todoList = this.filterTodos(this.state.filter).map(item => {

            return  (
                <TodoItem
                    onChange={this.handleChange}
                    onEdit={this.setEditedTodo}
                    onDelete={this.handleDelete}
                    key={item.id} item={item}
                />)
        });

        return (
            <div className="wrapper">
                <AddTodo
                    toggleAll={this.toggleAll}
                    addTodo={this.addTodo}
                />
                <div className="todo-list">
                    { todoList }
                </div>
                {this.state.todos.length !== 0 &&
                    <TodoFooter
                        activeCount={this.filterTodos('active').length}
                        clearCompleted={this.clearCompleted}
                        setFilter={this.setFilter}
                        {...this.state}
                    />
                }
            </div>
        )
    }
}

export default App;
