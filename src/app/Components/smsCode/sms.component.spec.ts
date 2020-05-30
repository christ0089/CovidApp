import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SMSComponent } from './sms.component';

describe('SMSComponent', () => {
  let component: SMSComponent;
  let fixture: ComponentFixture<SMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMSComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
