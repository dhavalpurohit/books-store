import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imprint-modal',
  imports: [],
  templateUrl: './imprint-modal.component.html',
  styleUrl: './imprint-modal.component.css'
})
export class ImprintModalComponent {
   constructor(
       public activeModal: NgbActiveModal,
     ) { }
   
  closeModal() {
    this.activeModal.dismiss();
  }
}
