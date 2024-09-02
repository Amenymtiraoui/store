import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagrammeursComponent } from './instagrammeurs.component';

describe('InstagrammeursComponent', () => {
  let component: InstagrammeursComponent;
  let fixture: ComponentFixture<InstagrammeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstagrammeursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagrammeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
