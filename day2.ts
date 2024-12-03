const day2Data = await Deno.readTextFile("day2.data");

const reports: string[] = day2Data.split("\n")

function isSafe(levels: number[]): boolean {
    const direction = Math.sign(levels[1] - levels[0])
    if (direction === 0) {
        return false
    }
    const unsafe = levels.some((level, idx) => {
        if (idx < levels.length-1) {
            const n = level
            const m = levels[idx + 1]

            const direction0 = Math.sign(m - n)
            if (direction0 !== direction) {
                return true
            } else if (Math.abs(m - n) > 3) {
                return true
            }
        }
        return false
    })
    return !unsafe
}
export function day2part1(): number {
    let safeCount = reports.length
    reports.forEach(report => {
        const levels = report.split(" ").map(l => parseInt(l))
        if (!isSafe(levels)) {
          safeCount -= 1
        }
    })
    // 213
    return safeCount
}

export function day2part2(): number {
    let safeCount = reports.length
    reports.forEach(report => {
        const levels = report.split(" ").map(l => parseInt(l))
        const safe = levels.some((level, idx) => {
            const newLevels = levels.filter((_, i) => i !== idx)
            return isSafe(newLevels);

        })
        if (!safe) {
            safeCount -= 1
        }
    })
    return safeCount
}