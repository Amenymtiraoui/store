import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { GestionBoutiqueComponent } from '../gestion-boutique/gestion-boutique.component';
import { InstagrammeursComponent } from '../instagrammeurs/instagrammeurs.component';
@Component({
  selector: 'app-manage-insta',
  standalone: true,
  imports: [TabViewModule,GestionBoutiqueComponent,InstagrammeursComponent],
  templateUrl: './manage-insta.component.html',
  styleUrl: './manage-insta.component.css'
})
export class ManageInstaComponent {

}
