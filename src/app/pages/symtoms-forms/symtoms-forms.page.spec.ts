import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SymtomsFormsPage } from './symtoms-forms.page';

describe('SymtomsFormsPage', () => {
  let component: SymtomsFormsPage;
  let fixture: ComponentFixture<SymtomsFormsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymtomsFormsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymtomsFormsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
