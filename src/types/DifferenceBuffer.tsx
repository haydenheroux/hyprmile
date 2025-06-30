export class DifferenceBuffer {
  public readonly prev: number;
  private readonly value?: number;

  constructor(init: number, value?: number) {
    this.prev = init;
    this.value = value;
  }

  fill(value: number): DifferenceBuffer {
    if (this.value === undefined) {
      return new DifferenceBuffer(this.prev, value);
    }

    return this.value === value
      ? this
      : new DifferenceBuffer(this.value, value);
  }

  difference(): number {
    return this.value === undefined ? 0.0 : this.value - this.prev;
  }
}
