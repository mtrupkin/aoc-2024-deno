export interface Point {
    x: number
    y: number
}

export function add(p0: Point, p1: Point): Point {
    return { x: p0.x + p1.x, y: p0.y + p1.y }
}

export function mul(p0: Point, p1: Point): Point {
    return { x: p0.x * p1.x, y: p0.y * p1.y }
}

export interface Size {
    h: number;
    w: number;
}

export function within(size: Size, { x, y }: Point): boolean {
    return (x >= 0) && (y >= 0) && (x < size.w) && (y < size.h);
}

export function forEach(size: Size, f: (p: Point) => void): void {
    for (let y = 0; y < size.h; y += 1) {
        for (let x = 0; x < size.w; x += 1) {
            f({ x, y });
        }
    }
}

/**
 * A mutable matrix class.
 */
export class Matrix<T> {
    readonly matrix: T[][] = [];

    /**
     * Creates an instance of Matrix.
     * @param area - The size of the matrix.
     * @param create - A function to create an element at a given point.
     */
    constructor(readonly area: Size, create: (p: Point) => T) {
        for (let y = 0; y < this.area.h; y += 1) {
            this.matrix[y] = new Array(this.area.w);
            for (let x = 0; x < this.area.w; x += 1) {
                const p = { x, y };
                this.set(p, create(p));
            }
        }
    }

    /**
     * Gets the element at the specified point.
     * @param param0 - The point with x and y coordinates.
     * @returns The element at the specified point.
     */
    get({ x, y }: Point): T {
        return this.matrix[y][x];
    }

    /**
     * Sets the element at the specified point.
     * @param param0 - The point with x and y coordinates.
     * @param elem - The element to set.
     */
    set({ x, y }: Point, elem: T): void {
        this.matrix[y][x] = elem;
    }

    /**
     * Executes a provided function once for each matrix element.
     * @param f - The function to execute for each element, receiving the point and the element.
     */
    forEach(f: (p: Point, elem: T) => void): void {
        forEach(this.area, (p) => {
            f(p, this.get(p));
        });
    }
}
