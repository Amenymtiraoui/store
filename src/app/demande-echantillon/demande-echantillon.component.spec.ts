import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEchantillonComponent } from './demande-echantillon.component';

describe('DemandeEchantillonComponent', () => {
  let component: DemandeEchantillonComponent;
  let fixture: ComponentFixture<DemandeEchantillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeEchantillonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
