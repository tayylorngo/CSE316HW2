// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteListModal from './components/DeleteListModal/DeleteListModal'
import AddNewItemTransaction from './transactions/AddNewItemTransaction';
import RemoveItemTransaction from './transactions/RemoveItemTransaction';
import MoveItemUpTransaction from './transactions/MoveItemUpTransaction';
import MoveItemDownTransaction from './transactions/MoveItemDownTransaction';
import { FormLabel } from '@material-ui/core';
import EditDescriptionTransaction from './transactions/EditDescriptionTransaction';
import EditDateTransaction from './transactions/EditDateTransaction';
import EditItemStatusTransaction from './transactions/EditItemStatusTransaction';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      listLoaded: false,
      deletingList: false,
    }
  }

  componentDidMount(){
      document.addEventListener("keydown", this.handleUndoKeyboard.bind(this), false);
      document.addEventListener("keydown", this.handleRedoKeyboard.bind(this), false);

  }

  undo = () => {
    this.tps.undoTransaction();
  }

  handleUndoKeyboard (e){
      if(e.ctrlKey && e.which === 90){
        if(this.tps.hasTransactionToUndo()){
          this.tps.undoTransaction();
          if(!this.tps.hasTransactionToUndo()){
            this.setState(this.state);
          }
        }
      }
  }

  redo = () => {
    this.tps.doTransaction();
  }

  handleRedoKeyboard(e){
    if(e.ctrlKey && e.which === 89){
      if(this.tps.hasTransactionToRedo()){
          this.tps.doTransaction();
        if(!this.tps.hasTransactionToRedo()){
          this.setState(this.state);
        }
      }
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      listLoaded: true
    });
    this.tps.clearAllTransactions();
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1,
      listLoaded: true
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      due_date: "No Date",
      status: "incomplete",
      id: this.state.nextListItemId
    };
    this.setState({nextListItemId: this.state.nextListItemId + 1});
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  openDeleteListModal = () => {
      this.setState({deletingList: true}, this.afterToDoListsChangeComplete);
  }

  closeDeleteListModal = () => {
    this.setState({deletingList: false}, this.afterToDoListsChangeComplete);
  }

  deleteList = () => {
      let newToDoLists = this.state.toDoLists;
      newToDoLists = newToDoLists.slice(1);
      this.setState({
        toDoLists: newToDoLists,
        currentList: {items: []},
        listLoaded: false
        }, this.afterToDoListsChangeComplete
      );
      this.closeDeleteListModal();
  }

  closeCurrentList = () => {
    this.setState({
      currentList: {items: []},
      listLoaded: false
    }, this.afterToDoListsChangeComplete);
    this.tps.clearAllTransactions();
  }

  changeListName = (newName) => {
      let newToDoLists = this.state.toDoLists;
      newToDoLists[0].name = newName;
      this.setState({
        toDoLists: newToDoLists,
      }, this.afterToDoListsChangeComplete);
  }

  addNewItemTransaction = () => {
    let transaction = new AddNewItemTransaction(this);
    this.tps.addTransaction(transaction);
  }

  addItem = (itemId) => {
      let newToDoLists = this.state.toDoLists;
      let currentList = this.state.currentList;
      let newItem = this.makeNewToDoListItem();
      newItem.id = itemId;
      currentList.items.push(newItem);
      newToDoLists[0] = currentList;
      this.setState({
        toDoLists: newToDoLists,
        currentList: currentList
        }, this.afterToDoListsChangeComplete);
      return newItem;
  }

  addNewItem = (newItem) => {
    let newToDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    currentList.items.push(newItem);
    newToDoLists[0] = currentList;
    this.setState({
      toDoLists: newToDoLists,
      currentList: currentList
      }, this.afterToDoListsChangeComplete);
  }

  addItemAtIndex = (item, index) => {
      let newToDoLists = this.state.toDoLists;
      let currentList = this.state.currentList;
      currentList.items.splice(index, 0, item);
      newToDoLists[0] = currentList;
      this.setState({
        toDoLists: newToDoLists,
        currentList: currentList
      }, this.afterToDoListsChangeComplete);
  }

  removeItemTransaction = (itemId) => {
      let transaction = new RemoveItemTransaction(this, itemId);
      this.tps.addTransaction(transaction);
  }

  removeItem = (itemId) => {
      let newToDoLists = this.state.toDoLists;
      let currentList = this.state.currentList;
      let index = -1;
      for(let i = 0; i < currentList.items.length; i++){
          if(itemId === currentList.items[i].id){
              index = i;
              break;
          }
      }
      let removedItem = currentList.items[index];
      currentList.items.splice(index, 1);
      newToDoLists[0] = currentList;
      this.setState({
        toDoLists: newToDoLists,
        currentList: currentList
        }, this.afterToDoListsChangeComplete);
      return [removedItem, index];
  }

  moveItemUpTransaction = (itemId) => {
      let transaction = new MoveItemUpTransaction(this, itemId);
      this.tps.addTransaction(transaction);
  }

  moveItemUp = (itemId) => {
      let newToDoLists = this.state.toDoLists;
      let currentList = this.state.currentList;
      let index = -1;
      for(let i = 0; i < currentList.items.length; i++){
          if(itemId === currentList.items[i].id){
            index = i;
            break;
          }
      }
      let item1 = currentList.items[index];
      currentList.items[index] = currentList.items[index - 1];
      currentList.items[index - 1] = item1;
      this.setState({
        toDoLists: newToDoLists,
        currentList: currentList
        }, this.afterToDoListsChangeComplete);
  }

  moveItemDownTransaction = (itemId) => {
      let transaction = new MoveItemDownTransaction(this, itemId);
      this.tps.addTransaction(transaction);
  }

  moveItemDown = (itemId) => {
    let newToDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    let index = -1;
    for(let i = 0; i < currentList.items.length; i++){
        if(itemId === currentList.items[i].id){
          index = i;
          break;
        }
    }
    let item1 = currentList.items[index];
    currentList.items[index] = currentList.items[index + 1];
    currentList.items[index + 1] = item1;
    this.setState({
      toDoLists: newToDoLists,
      currentList: currentList
      }, this.afterToDoListsChangeComplete);
}

updateItemDescriptionTransaction = (itemId, newDescription, oldDescription) => {
    let transaction = new EditDescriptionTransaction(this, itemId, newDescription, oldDescription);
    this.tps.addTransaction(transaction);
}

updateItemDescription = (itemId, newDescription) => {
    let newToDoLists = this.state.toDoLists;
    let currentList = this.state.currentList;
    for(let i = 0; i < currentList.items.length; i++){
        if(itemId === currentList.items[i].id){
          currentList.items[i].description = newDescription;
          break;
        }
    }
    this.setState({
      toDoLists: newToDoLists,
      currentList: currentList
      }, this.afterToDoListsChangeComplete);
}

updateItemDateTransaction = (itemId, newDate, oldDate) => {
    let transaction = new EditDateTransaction(this, itemId, newDate, oldDate);
    this.tps.addTransaction(transaction);
}

updateItemDate = (itemId, newDate) => {
  let newToDoLists = this.state.toDoLists;
  let currentList = this.state.currentList;
  for(let i = 0; i < currentList.items.length; i++){
      if(itemId === currentList.items[i].id){
        currentList.items[i].due_date = newDate;
        break;
      }
  }
  this.setState({
    toDoLists: newToDoLists,
    currentList: currentList
    }, this.afterToDoListsChangeComplete);
}

updateItemStatusTransaction = (itemId, newStatus, oldStatus) => {
    let transaction = new EditItemStatusTransaction(this, itemId, newStatus, oldStatus);
    this.tps.addTransaction(transaction);
}

updateItemStatus = (itemId, newStatus) =>{ 
  let newToDoLists = this.state.toDoLists;
  let currentList = this.state.currentList;
  for(let i = 0; i < currentList.items.length; i++){
      if(itemId === currentList.items[i].id){
        currentList.items[i].status = newStatus;
        break;
      }
  }
  this.setState({
    toDoLists: newToDoLists,
    currentList: currentList
    }, this.afterToDoListsChangeComplete);
}

  render() {
    let items = this.state.currentList.items;
    let hasUndo = this.tps.hasTransactionToUndo();
    let hasRedo = this.tps.hasTransactionToRedo();
    
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          loadedList={this.state.listLoaded}
          changeListName={this.changeListName}
          undoTransaction={this.undo}
          redoTransaction={this.redo}
          hasUndo={hasUndo}
          hasRedo={hasRedo}
        />
        <Workspace 
          toDoListItems={items} 
          openDeleteListModal={this.openDeleteListModal}
          closeCurrentList={this.closeCurrentList}
          loadedList={this.state.listLoaded}
          addNewItem={this.addNewItemTransaction}
          removeItem={this.removeItemTransaction}
          moveItemUp={this.moveItemUpTransaction}
          moveItemDown={this.moveItemDownTransaction}
          updateDescription={this.updateItemDescriptionTransaction}
          updateDate={this.updateItemDateTransaction}
          updateStatus={this.updateItemStatusTransaction}
        />
        {this.state.deletingList ? 
        <DeleteListModal
          closeModal={this.closeDeleteListModal}
          deleteListFunction={this.deleteList}
        /> : null}
      </div>
    );
  }
}

export default App;