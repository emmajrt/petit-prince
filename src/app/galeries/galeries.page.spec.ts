import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesPage } from './galeries.page';

describe('GaleriesPage', () => {
  let component: GaleriesPage;
  let fixture: ComponentFixture<GaleriesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(GaleriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
