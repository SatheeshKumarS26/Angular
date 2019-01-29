import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelationComponent } from './table-relation.component';

describe('TableRelationComponent', () => {
  let component: TableRelationComponent;
  let fixture: ComponentFixture<TableRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
