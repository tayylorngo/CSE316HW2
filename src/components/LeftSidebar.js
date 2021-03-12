// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    render() {
        let addListButtonStyle = null;
        if(this.props.loadedList){
            addListButtonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id="add-undo-redo-box">
                        <AddBox 
                            id="add-list-button"
                            className="material-icons todo_button"
                            onClick={this.handleAddNewList} 
                            style={addListButtonStyle}
                        />
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList, index) => {
                        if(index === 0 && this.props.loadedList){
                            return (
                            <ListLink
                                key={toDoList.id}
                                toDoList={toDoList}                               
                                loadToDoListCallback={this.props.loadToDoListCallback} 
                                currentList = {true}
                            />);
                        }
                        else{
                            return(
                            <ListLink
                                key={toDoList.id}
                                toDoList={toDoList}                               
                                loadToDoListCallback={this.props.loadToDoListCallback} 
                                currentList = {false}
                            />);
                        }                    
                    })
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;