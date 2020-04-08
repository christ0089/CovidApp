import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainFeedPage } from './main-feed.page';

describe('MainFeedPage', () => {
  let component: MainFeedPage;
  let fixture: ComponentFixture<MainFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
