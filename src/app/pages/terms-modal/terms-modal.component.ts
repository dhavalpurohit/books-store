import { Component } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-terms-modal',
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './terms-modal.component.html',
  styleUrl: './terms-modal.component.css'
})
export class TermsModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.dismiss();
  }
}