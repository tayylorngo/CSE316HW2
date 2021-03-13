// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    state = {
        editingListName: false
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    handleListClick = (event) => {
        event.preventDefault();
        if(event.detail === 1 && !this.props.currentList){
            this.handleLoadList();
        }
        else if(event.detail === 2 && this.props.currentList){
            this.setState(
                {editingListName: true}
            );
        }
    }

    handleListNameChange = (event) => {
        this.props.changeListName(event.target.value);
        this.setState({
            editingListName: false
        });
    }

    render() {
        let nameOfList = this.props.toDoList.name;
        let listName = <h4>{nameOfList}</h4>;
        if(this.props.currentList){
            listName = <h4 style={{color: "#ffc800"}}>{this.props.toDoList.name}</h4>
        }
        let inputStyle = {
            display: "none"
        }

        if(this.state.editingListName){
            inputStyle.display = "block";
            listName = null;
        }

        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        return (
            <div 
                className='todo-list-button'
                onClick={this.handleListClick}
            >
                <input 
                    type="text" 
                    style={inputStyle}
                    onBlur={this.handleListNameChange}
                    defaultValue={nameOfList}
                    ref={(input) => {
                        this.listName = input;
                        if(this.listName){
                            this.listName.focus();
                        }
                    }}
                >
                </input>
                {listName}
                <br />
            </div>
        )
    }
}

export default ListLink;