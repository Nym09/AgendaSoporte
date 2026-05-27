import { TestBed } from '@angular/core/testing';
import { registrosevices } from './registrosevices';

describe('registrosevices', () => {
  let service: registrosevices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(registrosevices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
