import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersPageComponent } from './volunteers-page.component';

describe('VolunteersPageComponent', () => {
  let component: VolunteersPageComponent;
  let fixture: ComponentFixture<VolunteersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
