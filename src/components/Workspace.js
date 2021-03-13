// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttonStyle = null;
        let transactionUndoButtonStyle = null;
        let transactionRedoButtonStyle = null;
        if(!this.props.loadedList){
            buttonStyle = {
                pointerEvents: "none",
                color: "#322d2d"
            }
        }
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
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo 
                            id="undo-button" 
                            className="list-item-control material-icons todo-button" 
                            style={transactionUndoButtonStyle} 
                            onClick={this.props.undoTransaction}
                        />
                        <Redo 
                            id="redo-button" 
                            className="list-item-control material-icons todo-button" 
                            style={transactionRedoButtonStyle}
                            onClick={this.props.redoTransaction}
                        />
                        <AddBox 
                            id="add-item-button" 
                            className="list-item-control material-icons todo-button" 
                            style={buttonStyle}
                            onClick={this.props.addNewItem}
                        />
                        <Delete 
                            id="delete-list-button" 
                            className="list-item-control material-icons todo-button" 
                            onClick={this.props.openDeleteListModal}
                            style={buttonStyle}
                        />
                        <Close 
                            id="close-list-button" 
                            className="list-item-control material-icons todo-button" 
                            onClick={this.props.closeCurrentList}
                            style={buttonStyle}
                        />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem, index) => {
                            if(index === 0){
                                return(<ToDoItem
                                    key={toDoListItem.id}
                                    toDoListItem={toDoListItem}
                                    removeItem={this.props.removeItem}
                                    moveItemUp={this.props.moveItemUp}
                                    moveItemDown={this.props.moveItemDown}
                                    firstItem={true}
                                    lastItem={false}
                                    updateDescription={this.props.updateDescription}                                 
                                />);
                            }
                            else if(index === this.props.toDoListItems.length - 1){
                                return(<ToDoItem
                                    key={toDoListItem.id}
                                    toDoListItem={toDoListItem}
                                    removeItem={this.props.removeItem}
                                    moveItemUp={this.props.moveItemUp}
                                    moveItemDown={this.props.moveItemDown}
                                    firstItem={false}
                                    lastItem={true}    
                                    updateDescription={this.props.updateDescription}                                 
                             
                                />);
                            }
                            else {
                                return(
                                    <ToDoItem
                                        key={toDoListItem.id}
                                        toDoListItem={toDoListItem}
                                        removeItem={this.props.removeItem}
                                        moveItemUp={this.props.moveItemUp}
                                        moveItemDown={this.props.moveItemDown}      
                                        firstItem={false}
                                        lastItem={false}    
                                        updateDescription={this.props.updateDescription}                                                        
                                    />
                                );
                            }
                        })
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;