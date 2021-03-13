// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditDescriptionTransaction extends jsTPS_Transaction {
    constructor(initApp, itemId, newDescription, oldDescription) {
        super();
        this.app = initApp;
        this.itemId = itemId;
        this.newDescription = newDescription;
        this.oldDescription = oldDescription;
    }

    doTransaction() {
        this.app.updateItemDescription(this.itemId, this.newDescription);
    }

    undoTransaction() {
        this.app.updateItemDescription(this.itemId, this.oldDescription);
    }
}