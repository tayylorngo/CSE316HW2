// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        let listName = <h4>{this.props.toDoList.name}</h4>;

        if(this.props.currentList){
            listName = <h4 style={{color: "#ffc800"}}>{this.props.toDoList.name}</h4>
        }
        return (
            <div 
                className='todo-list-button'
                onClick={this.handleLoadList}
            >
                {listName}
                <br />
            </div>
        )
    }
}

export default ListLink;