import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitalsPage } from './hospitals.page';

describe('HospitalsPage', () => {
  let component: HospitalsPage;
  let fixture: ComponentFixture<HospitalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
