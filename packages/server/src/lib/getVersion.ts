import { readFileSync } from 'fs'
import { join } from 'path'

export const getVersion = (dependencyName: string): string => {
  const pjson = JSON.parse(
    readFileSync(join(__dirname, '../..', 'package.json')).toString('utf8')
  )

  const v =
    pjson.dependencies[dependencyName] ??
    pjson.devDependencies[dependencyName] ??
    ''

  return v
}
