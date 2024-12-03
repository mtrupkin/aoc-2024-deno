const day1Data = await Deno.readTextFile("day1.data");

const listA: number[] = []
const listB: number[] = []
const lines: string[] = day1Data.split("\n")

lines.forEach(line => {
  const a = line.split("   ")
  listA.push(parseInt(a[0]))
  listB.push(parseInt(a[1]))
})

listA.sort()
listB.sort()

export function day1part1(): number {
  let result: number = 0

  listA.forEach((n, i) => {
    result += Math.abs(n - listB[i])
  })

  return result
}

export function day1part2(): number {
  let result: number = 0

  const map = new Map<number, number>()

  listB.forEach(n => {
    const b = map.get(n)
    if (b !== undefined) {
      map.set(n, b + 1)
    } else {
      map.set(n, 1)
    }
  })

  listA.forEach(n => {
    const count = map.get(n)
    if (count !== undefined) {
      result += n * count
    }
  })

  return result
}
