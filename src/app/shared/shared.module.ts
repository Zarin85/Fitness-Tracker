import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, FormsModule, FlexModule, MaterialModule],
  exports: [CommonModule, FormsModule, FlexModule, MaterialModule],
})
export class SharedModule {}
