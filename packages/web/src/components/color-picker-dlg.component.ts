import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface ColorPickerDlgData {
  defaultColor: string
}

@Component({
  selector: 'color-picker-dlg',
  template: `
    <div mat-dialog-content>
      <span
        [(colorPicker)]="data.defaultColor"
        [style.background]="data.defaultColor"
        [cpDialogDisplay]="'inline'"
        [cpToggle]="true"
        [cpDisableInput]="true"
        [cpOutputFormat]="'hex'"
      >
      </span>
    </div>
    <div mat-dialog-actions>
      <button
        mat-raised-button
        color="accent"
        [mat-dialog-close]="data.defaultColor"
        cdkFocusInitial
        style="width: 100%;"
      >
        Ok
      </button>
    </div>
  `,
  styles: [``],
})
export class ColorPickerDlgComponent {
  constructor(
    public dialogRef: MatDialogRef<ColorPickerDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColorPickerDlgData
  ) {
    // empty constructor
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
