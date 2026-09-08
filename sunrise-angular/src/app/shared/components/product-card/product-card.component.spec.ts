import '@angular/compiler';
import { describe, it, expect } from 'vitest';
import {
  runInInjectionContext,
  createEnvironmentInjector,
  EnvironmentInjector,
} from '@angular/core';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  it('should calculate category icon correctly', () => {
    const injector = createEnvironmentInjector([], {} as EnvironmentInjector);
    const component = runInInjectionContext(injector, () => new ProductCardComponent());

    expect(component.getCategoryIcon('network-camera')).toBe('fa fa-video-camera');
    expect(component.getCategoryIcon('nvr')).toBe('fa fa-server');
    expect(component.getCategoryIcon('epabx')).toBe('fa fa-phone');
    expect(component.getCategoryIcon('biometric')).toBe('fa fa-id-card-o');
    expect(component.getCategoryIcon('cable')).toBe('fa fa-sitemap');
    expect(component.getCategoryIcon('unknown')).toBe('fa fa-cubes');
  });

  it('should default priority signal input to false', () => {
    const injector = createEnvironmentInjector([], {} as EnvironmentInjector);
    const component = runInInjectionContext(injector, () => new ProductCardComponent());

    expect(component.priority()).toBe(false);
  });
});
