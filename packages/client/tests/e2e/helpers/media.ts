import rf from 'rimraf'

export const deleteScreenshots = (screenshotsPath: string) => {
  rf(`${screenshotsPath}/*.png`, err => {
    if (err) console.log(err)
  })
}

export const deleteVideos = (screenshotsPath: string) => {
  rf(`${screenshotsPath}/*.webm`, err => {
    if (err) console.log(err)
  })
}
