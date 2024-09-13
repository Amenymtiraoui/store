import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { InstagrammeursComponent } from './instagrammeurs/instagrammeurs.component';
import { ManageInstaComponent } from './manage-insta/manage-insta.component';
import { GestionBoutiqueComponent } from './gestion-boutique/gestion-boutique.component';
import { DemandeEchantillonComponent } from './demande-echantillon/demande-echantillon.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' } ,
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'messagerie', component:  MessagerieComponent},
    { path: 'instagrammeur', component:  InstagrammeursComponent},
    { path:'manage_insta', component:ManageInstaComponent},
    { path:'gestion-boutique',component:GestionBoutiqueComponent},
    { path: 'demande-echantillon',component: DemandeEchantillonComponent}
   
  ];