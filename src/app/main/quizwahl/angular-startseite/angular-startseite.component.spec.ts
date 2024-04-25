import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularStartseiteComponent } from './angular-startseite.component';

describe('AngularStartseiteComponent', () => {
  let component: AngularStartseiteComponent;
  let fixture: ComponentFixture<AngularStartseiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularStartseiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularStartseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
