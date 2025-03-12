import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TermsModalComponent } from '../terms-modal/terms-modal.component'
import { DataProtectionModalComponent } from '../data-protection-modal/data-protection-modal.component'
import { ImprintModalComponent } from '../imprint-modal/imprint-modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [TranslateModule],
})
export class FooterComponent {

  constructor(
    private modalService: NgbModal,
  ) {}

    openTermsModal() {
      this.modalService.open(TermsModalComponent, {
        centered: true,
        backdrop: "static",
      });
    }

    openImprintModal() {
      this.modalService.open(ImprintModalComponent, {
        centered: true,
        backdrop: "static",
      });
    }
    openDataProtectionModal() {
      this.modalService.open(DataProtectionModalComponent, {
        centered: true,
        backdrop: "static",
      });
    }

}
