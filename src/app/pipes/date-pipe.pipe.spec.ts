import { CustomDatePipe } from './date-pipe.pipe';

describe('CustomDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });
});
