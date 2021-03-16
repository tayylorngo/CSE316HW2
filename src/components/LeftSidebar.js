// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    render() {
        let addListButtonStyle = null;
        let transactionUndoButtonStyle = {};
        let transactionRedoButtonStyle = {};
        if(!this.props.hasUndo){
            transactionUndoButtonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }
        if(!this.props.hasRedo){
            transactionRedoButtonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }
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
                        <Undo 
                            id="undo-button" 
                            className="material-icons" 
                            style={transactionUndoButtonStyle}
                            onClick={this.props.undoTransaction}
                        />
                        <Redo 
                            id="redo-button" 
                            className="material-icons" 
                            style={transactionRedoButtonStyle}
                            onClick={this.props.redoTransaction}
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
                                changeListName={this.props.changeListName}
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