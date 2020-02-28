import React, { Component } from 'react';

class AddTodo extends Component {

    state= {
        title: ''
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});

    };
    addTodo = (e) => {
        e.preventDefault();
        if(this.state.title !== '') {
            this.props.addTodo(this.state.title);
        }
        this.setState({title : ''});
    };

    render() {

        return (
            <div className="add-todo">
                {this.props.todos.length !== 0 &&
                    <button onClick={this.props.toggleAll} className="button-left">{''}</button>
                }

                <form onSubmit={(e) => this.addTodo(e)}>

                    <input
                        type="text"
                        name='title'
                        value={this.state.title}
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Add todo..."
                    />
                    <button className="button-right">Add</button>
                </form>
            </div>
        )
    }
}

export default AddTodo;
