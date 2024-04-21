import { TestBed } from '@angular/core/testing';

import { ImageToBase64Service } from './image-to-base64.service';

describe('ImageToBase64Service', () => {
  let service: ImageToBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageToBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
