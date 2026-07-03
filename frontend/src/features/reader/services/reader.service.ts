export function calculateSessionXp(sequentialPagesRead: number) {
  return Math.max(0, sequentialPagesRead)
}
