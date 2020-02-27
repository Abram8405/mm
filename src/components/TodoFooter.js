import React from 'react';

function TodoFooter(props) {

    return (
        <footer>
            <span className="all-activ-items">
                {props.activeCount}
                {props.activeCount === 1 ? "item" : "itemes" } left
            </span>

            <ul>
                <li><button onClick={() => props.setFilter('all')}>All</button></li>
                <li><button onClick={() => props.setFilter('active')} >Active</button></li>
                <li><button onClick={() => props.setFilter('completed')} >Completed</button></li>
            </ul>
            <div className="clear-competed">
                {props.activeCount !== props.todos.length &&
                    <button onClick={(e) => props.clearCompleted(e, 'clearAllCompleted')}>
                        Clear completed
                    </button>
                }
            </div>
        </footer>
    )

}

export default TodoFooter;
