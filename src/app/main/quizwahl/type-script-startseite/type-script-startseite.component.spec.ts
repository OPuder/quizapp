import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScriptStartseiteComponent } from './type-script-startseite.component';

describe('TypeScriptStartseiteComponent', () => {
  let component: TypeScriptStartseiteComponent;
  let fixture: ComponentFixture<TypeScriptStartseiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeScriptStartseiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeScriptStartseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
