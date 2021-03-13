// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    state = {
        editingDescription: false,
        editingDate: false,
        editingStatus: false
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleDeleteItemId = () => {
        this.props.removeItem(this.props.toDoListItem.id);
    }

    handleMoveItemUp = () => {
        this.props.moveItemUp(this.props.toDoListItem.id);
    }

    handleMoveItemDown = () => {
        this.props.moveItemDown(this.props.toDoListItem.id);
    }

    handleEditDescription = () => {
        this.setState(
            {editingDescription: true}
        );
    }

    handleUpdateDescription = (event) => {
        this.props.updateDescription(this.props.toDoListItem.id, event.target.value, this.props.toDoListItem.description);
        this.setState(
            {editingDescription: false}
        );
    }

    render() {
        let moveItemUpButtonStyle = null;
        let moveItemDownButtonStyle = null;
        if(this.props.firstItem){
            moveItemUpButtonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }
        if(this.props.lastItem){
            moveItemDownButtonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }

        let descriptionInputStyle = this.state.editingDescription ? null : {display: "none"}
        let dateInputStyle = this.state.editingDate ? null : {display: "none"}
        let statusInputStyle = this.state.editingStatus ? null : {display: "none"}

        let descriptionInput = <input 
                                    type="text" 
                                    style={descriptionInputStyle}
                                    onBlur={this.handleUpdateDescription}
                                    defaultValue={this.props.toDoListItem.description}
                                    ref={(input) => {
                                        this.descriptionInput = input;
                                        if(this.descriptionInput){
                                            this.descriptionInput.focus();
                                        }
                                    }}
                                >
                                </input>


        let dateInput = <input type="date" style={dateInputStyle}></input>
        let completionInput = (
                            <select style={statusInputStyle}>
                                <option>complete</option>
                                <option>incomplete</option>
                            </select>);

        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        let itemDescription = <div className='item-col task-col' onDoubleClick={this.handleEditDescription}>
                                        <h4>{listItem.description}</h4>
                              </div>;
        if(this.state.editingDescription){
            itemDescription = null;
        }

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {itemDescription}
                {descriptionInput}
                <div className='item-col due-date-col'><h4>{listItem.due_date}</h4></div>
                {dateInput}
                <div className='item-col status-col'><h4 className={statusType}>{listItem.status}</h4></div>
                {completionInput}
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className='list-item-control todo-button' 
                        onClick={this.handleMoveItemUp}
                        style={moveItemUpButtonStyle}
                    />
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                        onClick={this.handleMoveItemDown}
                        style={moveItemDownButtonStyle}
                    />
                    <Close 
                        className='list-item-control todo-button' 
                        onClick={this.handleDeleteItemId}
                    />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;