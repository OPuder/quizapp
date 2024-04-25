import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaScriptStartseiteComponent } from './java-script-startseite.component';

describe('JavaScriptStartseiteComponent', () => {
  let component: JavaScriptStartseiteComponent;
  let fixture: ComponentFixture<JavaScriptStartseiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavaScriptStartseiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JavaScriptStartseiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
