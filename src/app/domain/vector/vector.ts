/**
 * Class that represents an element of a vector space. It is immutable. Uses an
 * Array as underlying container.
 */
export class Vector {
  private _vector: number[] = [];

  /**
   * Constructs a new `Vector` with size `size` and all values set to `0`.
  *
  * @param size number of dimensions of this `Vector`
  */
  constructor(size: number);
  /**
    * Constructs a new `Vector` with size `size` and all values set to `value`.
    *
    * @param size number of dimensions of this `Vector`
    * @param value value with which to initialize `Vector` elements
    */
  constructor(size: number, value: number);
  /**
   * Constructs a new `Vector` based on a preexisting one.
   *
   * @param vector base `Vector`
   */
  constructor(vector: Vector);
  /**
   * Constructs a `Vector` based on an array of numbers.
   *
   * @param elements array of elements of new `Vector`
   */
  constructor(elements: number[]);
  constructor(arg0: number | Vector | number[], value: number = 0) {
    if (typeof arg0 == 'number') {
      this._vector = new Array(arg0).fill(value);
      return;
    }

    if (arg0 instanceof Vector) {
      this._vector = arg0.toArray();
      return;
    }

    this._vector = arg0;
  }

  get dimension(): number {
    return this._vector.length;
  }

  toArray(): number[] {
    return new Array(...this._vector);
  }

  toString(): string {
    return this._vector.toString();
  }

  getAt(index: number) {
    this.checkBounds(index);

    return this._vector[index];
  }

  /**
   * Sets element at `index` to value `x`. Returns a new instance of `Vector`
   * without modifying the original.
   *
   * @param x new value
   * @param index index of modified element
   * @returns new `Vector`
   */
  setAt(x: number, index: number): Vector {
    this.checkBounds(index);

    const arr = new Array(...this._vector);
    arr[index] = x;

    return new Vector(arr);
  }

  /**
   * Applies a function to each element of this `Vector` and returns a new
   * `Vector` with resulting values in the same index of the element used as
   * argument. Doesn't modify the original `Vector`.
   *
   * @param f function to apply to each element of this `Vector`
   * @returns a new `Vector` with values returned by `f`.
   */
  map(f: (x: number, i: number, arr: number[]) => number): Vector {
    return new Vector(this._vector.map(f));
  }

  /**
   * Performs addition element-wise between both `Vector`s and returns a new one
   * with the results.
   *
   * @param vector other `Vector` of same dimension
   */
  add(vector: Vector): Vector {
    return this.map((x, i) => x + vector.getAt(i));
  }

  /**
   * Performs multiplication with scalar.
   *
   * @param scalar number with which to multiply elements
   * @returns new `Vector`
   */
  multiply(scalar: number): Vector {
    return this.map(x => x * scalar);
  }

  /**
   * Performs scalar product between this and another `Vector`.
   *
   * @param vector another `Vector` with which to perform scalar product
   * @returns result
   */
  scalarProduct(vector: Vector): number {
    this.checkDimensions(vector);

    let sum = 0;
    for (let i = 0; i < this.dimension; i++) {
      sum += vector.getAt(i) * this.getAt(i);
    }

    return sum;
  }

  /**
   * Performs vector product between this (first operand) and another `Vector`.
   *
   * @param vector second operand
   * @returns a new `Vector`
   */
  vectorProduct(vector: Vector): Vector {
    this.assertVectorProductDefined(vector);

    const x = this.getAt(1) * vector.getAt(2) - this.getAt(2) * vector.getAt(1);
    const y = this.getAt(0) * vector.getAt(2) - this.getAt(2) * vector.getAt(0);
    const z = this.getAt(0) * vector.getAt(1) - this.getAt(1) * vector.getAt(0);

    return new Vector([x, y, z]);
  }

  private checkBounds(index: number): void {
    if (index >= this.dimension || index < 0) {
      throw new Error("Index out of bounds!");
    }
  }

  private checkDimensions(vector: Vector): void {
    if (vector.dimension != this.dimension) {
      throw new Error("Both vectors must have the same dimension!");
    }
  }

  private assertVectorProductDefined(vector: Vector) {
    if (vector.dimension != 3 || this.dimension != 3) {
      throw new Error("Both vectors must have 3 dimensions!");
    }
  }
}
