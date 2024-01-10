import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFeatureComponent } from './connect-feature.component';

describe('ConnectFeatureComponent', () => {
  let component: ConnectFeatureComponent;
  let fixture: ComponentFixture<ConnectFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectFeatureComponent]
    });
    fixture = TestBed.createComponent(ConnectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
