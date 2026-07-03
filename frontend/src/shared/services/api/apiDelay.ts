export async function apiDelay(ms = 280) {
  await new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
