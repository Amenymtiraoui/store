import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBoutiqueComponent } from './gestion-boutique.component';

describe('GestionBoutiqueComponent', () => {
  let component: GestionBoutiqueComponent;
  let fixture: ComponentFixture<GestionBoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBoutiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
