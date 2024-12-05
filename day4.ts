import {add, Matrix, mul, Point, Size, within} from "./math.ts";

const day4Data = await Deno.readTextFile("day4.data");

function matches(points0: Point[], points1: Point[]): boolean {
    return points0.every((p0, idx) => {
        return p0 === points1[idx]
    })
}

export function day4part1(): number {
    const hits:Point[][] = []
    const lines = day4Data.split("\n")
    const size: Size = { w: lines[0].length, h: lines.length };

    const m = new Matrix<string>(size,(p: Point) => lines[p.y][p.x]);

    const dirs: Point[][] = [
        [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],
        [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}, {x:3, y:3}],

        [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:0, y:3}],
        [{x:0, y:0}, {x:-1, y:1}, {x:-2, y:2}, {x:-3, y:3}],

        [{x:0, y:0}, {x:-1, y:0}, {x:-2, y:0}, {x:-3, y:0}],
        [{x:0, y:0}, {x:-1, y:-1}, {x:-2, y:-2}, {x:-3, y:-3}],

        [{x:0, y:0}, {x:0, y:-1}, {x:0, y:-2}, {x:0, y:-3}],
        [{x:0, y:0}, {x:1, y:-1}, {x:2, y:-2}, {x:3, y:-3}],
    ]

    const word = "XMAS"

    m.forEach((q, _elem) => {
            dirs.forEach((dir) => {
                const points = dir.map((p) => {
                    return add(q, p)
                })
                const hit = points.every((p0, idx) => {
                    return within(size, p0) && m.get(p0) === word.charAt(idx);
                })
                if (hit) {
                    hits.push(points)
                }
            })
    })

    // 2297
    return hits.length
}

export function day4part2(): number {
    const hits:Point[] = []
    const lines = day4Data.split("\n")
    const size: Size = { w: lines[0].length, h: lines.length };

    const m = new Matrix<string>(size,(p: Point) => lines[p.y][p.x]);

    const dirs: Point[][] = [
        [{x:-1, y:-1}, {x:0, y:0}, {x:1, y:1}],
        [{x:1, y:-1}, {x:0, y:0}, {x:-1, y:1}],
        [{x:1, y:1}, {x:0, y:0}, {x:-1, y:-1}],
        [{x:-1, y:1}, {x:0, y:0}, {x:1, y:-1}]
    ]

    const word = "MAS"

    m.forEach((q, _elem) => {
        let crossHits = 0
        dirs.forEach((dir) => {
            const points = dir.map((p) => {
                return add(q, p)
            })

            const hit = points.every((p0, idx) => {
                return within(size, p0) && m.get(p0) === word.charAt(idx)
            })

            if (hit) {
                crossHits += 1
            }
        })
        if (crossHits === 2) {
            hits.push(q)
        } else if (crossHits >= 3) {
            console.log('error')
        }
    })

    // 1745
    return hits.length
}