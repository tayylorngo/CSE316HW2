import React, {Component} from 'react';
import './DeleteListModal.css';

class DeleteListModal extends Component{

    render(){
        return(
            <div id="modal-overlay">
                <div id="modal">
                    <div class="modal-header header">
                        <h3>Delete List?</h3>
                        <div class="modal-button deleteList" id="cancelDeleteList-button" onClick={this.props.closeModal}>
                            X
                        </div>
                    </div>
                    <div class="modal-header">
                        <div class="modal-button" id="confirmDeleteList-button" onClick={this.props.deleteListFunction}>
                            Confirm
                        </div>
                        <div class="modal-button deleteList" id="cancelDeleteList-button" onClick={this.props.closeModal}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default DeleteListModal;