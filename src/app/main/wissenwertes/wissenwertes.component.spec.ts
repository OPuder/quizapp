import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WissenwertesComponent } from './wissenwertes.component';

describe('WissenwertesComponent', () => {
  let component: WissenwertesComponent;
  let fixture: ComponentFixture<WissenwertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WissenwertesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WissenwertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
