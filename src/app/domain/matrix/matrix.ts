import { Vector } from '../vector/vector';

export class Matrix {
  private _matrix: number[][] = [];

  /**
   * Constructs a new `Matrix` `n`x`n` with all elements set to `value`
   *
   * @param n dimensions of new `Matrix`
   * @param value value with which to fill new matrix
   */
  constructor(n: number, value: number);
  /**
   * Constructs a new `Matrix` `n`x`m` with all elements set to `value`
   *
   * @param n first dimension (number of rows) of new `Matrix`
   * @param m second dimension (number of columns) of new `Matrix`
   * @param value value with which to fill new matrix
   */
  constructor(n: number, m: number, value: number);
  /**
   * Constructs a new `Matrix` based on a preexisting one.
   *
   * @param matrix base `Matrix`
   */
  constructor(matrix: Matrix);
  /**
   * Constructs a new `Matrix` with a `Vector` as the first row.
   *
   * @param vector base `Vector`
   */
  constructor(vector: Vector);
  /**
   * Constructs a `Matrix` based on a 2D array of numbers.
   *
   * @param matrix 2D array of numbers
   */
  constructor(matrix: number[][]);
  constructor(arg0: Matrix | Vector | number[][] | number, arg1?: number, arg2?: number) {
    if (arg0 instanceof Matrix) {
      this._matrix = arg0.to2dArray();
      return;
    }

    if (arg0 instanceof Vector) {
      this._matrix = [arg0.toArray()];
      return;
    }

    if (arg0 instanceof Array) {
      Matrix.assertValidity(arg0);
      this._matrix = arg0;
      return;
    }

    const n = arg0;
    const m = arg2 === undefined ? n : arg1;
    const fillValue = arg2 ?? 0;

    this._matrix = new Array(n).fill(0)
      .map(() => new Array(m).fill(fillValue));
  }

  /**
   * Asserts that a given 2D array of numbers can be used as a matrix, i.e., all
   * inner matrices have the same length.
   *
   * @param array2d 2D array of numbers to check
   */
  static assertValidity(array2d: number[][]): void {
    const colSize = array2d[0].length
    const isValidMatrix = array2d.every(row => row.length === colSize);

    if (!isValidMatrix) {
      throw new Error("All Matrix rows must have same size!");
    }
  }

  /**
   * Constructs a `Matrix` representation of an identity matrix of dimension
   * `n`.
   *
   * @param n dimension of the identity matrix
   * @returns new `Matrix` representing an identity matrix of dimension `n`
   */
  static identity(n: number): Matrix {
    const m = new Matrix(n, 0);

    const ones = new Array(n).fill(1);
    const indices = new Array(n).fill(0).map((_, i) => ([i, i]));

    return m.setMultiple(ones, indices);
  }

  /**
   * First dimension (number of rows).
   */
  get n(): number {
    return this._matrix.length;
  }

  /**
   * Second dimension (number of columns).
   */
  get m(): number {
    return this._matrix[0].length;
  }

  /**
   * @returns 2D array representation of this `Matrix`.
   */
  to2dArray(): number[][] {
    return this._matrix.map((row: number[]) => new Array(...row));
  }

  getAt(i: number, j: number): number {
    this.checkBounds(i, j);

    return this._matrix[i][j];
  }

  /**
   * Sets element at row `i` and column `j` to value `x`. Returns a new instance
   * of `Matrix` without modifying the original.
   *
   * @param x new value
   * @param i row index (zero-based)
   * @param j column index (zero-based)
   * @returns new `Matrix`
   */
  setAt(x: number, i: number, j: number): Matrix {
    this.checkBounds(i, j);

    const arr = this.to2dArray();
    arr[i][j] = x;
    return new Matrix(arr);
  }

  /**
   * Sets multiple element values at once.Returns a new instance of `Matrix`
   * without modifying the original.
   *
   * @param values new values
   * @param indices array of `[i, j]` pairs corresponding to the indices of the
   * elements to be set; k-th pair is the address of value at `values[k]`
   * @returns new `Matrix`
   */
  setMultiple(values: number[], indices: number[][]): Matrix {
    indices.forEach(([i, j]) => this.checkBounds(i, j));

    const arr = this.to2dArray();
    values.forEach((value, index) => {
      const [i, j] = indices[index];
      arr[i][j] = value;
    })

    return new Matrix(arr);
  }

  /**
   * Performs addition element-wise between this `Matrix` and another.
   *
   * @param matrix another `Matrix` with which to perform addition
   * @returns new `Matrix`
   */
  add(matrix: Matrix): Matrix {
    this.checkDimensions(matrix);
    const arr = this._matrix.map((row, i) => row.map((x, j) => x + matrix.getAt(i, j)));
    return new Matrix(arr);
  }

  /**
   * Performs multiplication with scalar.
   *
   * @param scalar number with which to multiply elements
   * @returns new `Matrix`
   */
  multiply(scalar: number): Matrix {
    const arr = this._matrix.map(row => row.map(x => x * scalar));
    return new Matrix(arr);
  }

  /**
   * Performs matrix multiplication between this (first operand) and another
   * `Matrix`.
   *
   * @param matrix second operand
   * @returns a new `Matrix`
   */
  matrixMultiplication(matrix: Matrix): Matrix {
    const m = new Array(this.n).fill(0).map(() => new Array(matrix.m).fill(0));

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < matrix.m; j++) {
        for (let k = 0; k < this.m; k++) {
          m[i][j] += this.getAt(i, k) * matrix.getAt(k, j);
        }
      }
    }

    return new Matrix(m);
  }

  /**
   * Returns the transpose of this `Matrix` without modifying the original.
   *
   * @returns a new `Matrix`
   */
  transpose(): Matrix {
    const matrix = new Array(this.m).fill(0).map(() => new Array(this.n));

    this._matrix.forEach((row, i) => row.forEach((x, j) => matrix[j][i] = x));

    return new Matrix(matrix);
  }

  private checkBounds(i: number, j: number): void {
    if (i < 0 || j < 0 || i >= this.n || j >= this.m) {
      throw new Error("Index out of bounds!");
    }
  }

  private checkDimensions(matrix: Matrix) {
    if (this.n != matrix.n || this.m != matrix.m) {
      throw new Error("Matrices must have same dimensions!");
    }
  }
}
