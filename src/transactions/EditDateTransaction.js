// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditDateTransaction extends jsTPS_Transaction {
    constructor(initApp, itemId, newDate, oldDate) {
        super();
        this.app = initApp;
        this.itemId = itemId;
        this.newDate = newDate;
        this.oldDate = oldDate;
    }

    doTransaction() {
        this.app.updateItemDate(this.itemId, this.newDate);
    }

    undoTransaction() {
        this.app.updateItemDate(this.itemId, this.oldDate);
    }
}