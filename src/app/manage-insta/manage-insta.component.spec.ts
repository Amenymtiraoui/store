import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstaComponent } from './manage-insta.component';

describe('ManageInstaComponent', () => {
  let component: ManageInstaComponent;
  let fixture: ComponentFixture<ManageInstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInstaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageInstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
