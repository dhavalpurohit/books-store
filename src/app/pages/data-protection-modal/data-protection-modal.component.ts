import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-protection-modal',
  imports: [],
  templateUrl: './data-protection-modal.component.html',
  styleUrl: './data-protection-modal.component.css'
})
export class DataProtectionModalComponent {
   constructor(
       public activeModal: NgbActiveModal,
     ) { }
   
  closeModal() {
    this.activeModal.dismiss();
  }
}
