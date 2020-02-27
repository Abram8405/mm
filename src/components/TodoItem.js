import  React, { Component } from 'react';

class TodoItem extends Component{

    state = {
        title: this.props.item.title,
        edit: false
    };

    handleChange = (e) => {
         this.setState({ title: e.target.value})
    };
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.setState(() => ({edit: false}));
        }
    };
    editTodo = () => {
        this.setState(() => ({edit: true}));
    };

    setEditedTodo = () => {
        this.props.onEdit(this.state.title, this.props.item.id);
        this.setState(() => ({edit: false}));
    };

    render() {
        const {id, title, completed} = this.props.item;

        return (
            <div className="todo-item">
                <p>
                    <label>
                        <input
                            onChange={() => this.props.onChange(id)}
                            type="checkbox"
                            checked={completed}
                        />
                        <span onDoubleClick={() => this.editTodo()}
                              className={completed ? 'completed' : null}>
                             {title}
                        </span>
                    </label>
                    <input
                        className={this.state.edit ? null : 'edit-todo'}
                        ref={input => input && input.focus()}
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        name='title'
                        onKeyDown={(e) => this.handleKeyDown(e)}
                        value={this.state.title}
                        onBlur={(e) => this.setEditedTodo(title, id)}
                    />
                    <button onClick={() => this.props.onDelete(id)}>X</button>
                </p>

            </div>
        )

    }


}

export default TodoItem;
