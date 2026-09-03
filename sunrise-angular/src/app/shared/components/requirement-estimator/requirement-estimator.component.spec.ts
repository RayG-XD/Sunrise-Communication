// @vitest-environment jsdom
import '@angular/compiler';
import { Injector, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RequirementEstimatorComponent } from './requirement-estimator.component';

describe('RequirementEstimatorComponent', () => {
  let component: RequirementEstimatorComponent;

  beforeEach(() => {
    const injector = Injector.create({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    component = injector.runInContext(() => new RequirementEstimatorComponent());
  });

  it('should initialize with default step and premise', () => {
    expect(component.currentStep()).toBe(1);
    expect(component.selectedPremise()).toBe('society');
    expect(component.needCctv()).toBe(true);
    expect(component.needIntercom()).toBe(true);
  });

  it('should update step when goToStep is called', () => {
    component.goToStep(2);
    expect(component.currentStep()).toBe(2);

    component.goToStep(3);
    expect(component.currentStep()).toBe(3);
  });

  it('should update configuration presets when setPremise is called for office', () => {
    component.setPremise('office');
    expect(component.selectedPremise()).toBe('office');
    expect(component.needBiometrics()).toBe(true);
    expect(component.needNetworking()).toBe(true);
    expect(component.cameraCount()).toBe(8);
  });

  it('should generate formatted BOQ text and WhatsApp quote URL', () => {
    const text = component.formattedBoqText();
    expect(text).toContain('Sunrise Communication');
    expect(text).toContain('Cooperative Housing Society (CHS)');

    const url = component.whatsappQuoteUrl();
    expect(url).toContain('https://wa.me/919323848622');
  });
});
