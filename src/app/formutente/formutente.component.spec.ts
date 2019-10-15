import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormutenteComponent } from './formutente.component';

describe('FormutenteComponent', () => {
  let component: FormutenteComponent;
  let fixture: ComponentFixture<FormutenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormutenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormutenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
