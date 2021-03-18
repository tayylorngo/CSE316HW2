// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItemTransaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    doTransaction() {
        if(this.removedItemId){
            this.itemAdded = this.app.addItem(this.removedItemId);
        }
        else{
            this.itemAdded = this.app.makeNewToDoListItem();
            this.app.addNewItem(this.itemAdded);
        }
    }

    undoTransaction() {
        this.app.removeItem(this.itemAdded.id);
        this.removedItemId = this.itemAdded.id;
    }
}