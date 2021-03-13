// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS";

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemDownTransaction extends jsTPS_Transaction {
    constructor(initApp, itemId) {
        super();
        this.app = initApp;
        this.itemId = itemId;
    }

    doTransaction() {
        this.app.moveItemDown(this.itemId);
    }

    undoTransaction() {
        this.app.moveItemUp(this.itemId);
    }
}