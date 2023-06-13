/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { serviceService } from './evento.service';

describe('Service: Evento.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [serviceService]
    });
  });

  it('should ...', inject([serviceService], (service: serviceService) => {
    expect(service).toBeTruthy();
  }));
});
