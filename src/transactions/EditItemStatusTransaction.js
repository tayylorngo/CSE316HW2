// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditItemStatusTransaction extends jsTPS_Transaction {
    constructor(initApp, itemId, newStatus, oldStatus) {
        super();
        this.app = initApp;
        this.itemId = itemId;
        this.newStatus = newStatus;
        this.oldStatus = oldStatus;
    }

    doTransaction() {
        this.app.updateItemStatus(this.itemId, this.newStatus);
    }

    undoTransaction() {
        this.app.updateItemStatus(this.itemId, this.oldStatus);
    }
}