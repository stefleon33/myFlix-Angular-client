import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @component
 * 
 * The MessageBoxComponent is responsible for displaying a dialog box with a title and content message. 
 * It is commonly used for showing additional information like genre, director details, or descriptions.
 */
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  
  /**
   * Creates an instance of MessageBoxComponent.
   * 
   * @param {any} data - The data passed to the dialog, including the title and content to be displayed.
   * @param {MatDialogRef<MessageBoxComponent>} dialogRef - The reference to the dialog, used to close the dialog box.
   */
  constructor(@Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      content: string
     },
     public dialogRef: MatDialogRef<MessageBoxComponent>
    ) {}

    /**
     * Lifecycle hook that is called when the component is initialized.
     * 
     */
    ngOnInit(): void { }  
    
    /**
     * Closes the dialog box.
     * This method is typically called when the user presses a close button.
     * 
     * @returns {void}
     */
    closeMessageBox(): void{
      this.dialogRef.close();
    }
 
}
