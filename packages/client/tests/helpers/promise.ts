export const waitFor = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve('timedOut'), ms)
  })
