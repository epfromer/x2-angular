import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface ColorPickerDlgData {
  defaultColor: string
}

@Component({
  selector: 'color-picker-dlg',
  template: ` <div>{{ data.defaultColor }}</div> `,
  styles: [``],
})
export class ColorPickerDlgComponent {
  constructor(
    public dialogRef: MatDialogRef<ColorPickerDlgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColorPickerDlgData
  ) { }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
