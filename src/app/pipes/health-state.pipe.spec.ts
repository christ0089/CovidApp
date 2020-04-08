import { HealthStatePipe } from './health-state.pipe';

describe('HealthStatePipe', () => {
  it('create an instance', () => {
    const pipe = new HealthStatePipe();
    expect(pipe).toBeTruthy();
  });
});
