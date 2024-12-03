const day3Data = await Deno.readTextFile("day3.data");

function getNum(s: string, terminator: string): number | undefined {
    const idx = s.indexOf(terminator)
    if (idx <= 0 || idx >= 4) {
        return undefined
    }
    return parseInt(s.substring(0, idx))
}

export function day3part1(): number {
    let sum = 0
    const lines = day3Data.split("\n")
    lines.forEach(line => {
        for (let i = 0; i < line.length; i++) {
            const c = line.charAt(i)
            if ((c === "m") && (line.charAt(i + 1) === "u") && (line.charAt(i + 2) === "l")  && (line.charAt(i + 3) === "(")) {
                const m = getNum(line.substring(i + 4), ",")
                if (m !== undefined) {
                    const n = getNum(line.substring(i + 5 + m.toString().length), ")")
                    if (n !== undefined) {
                        sum += m * n
                        i += 5 + m.toString().length + n.toString().length
                    }
                }
            }
        }
    })
    return sum
}

export function day3part2(): number {
    return 0
}