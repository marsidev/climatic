import pjson from '../../package.json'

export const getVersion = (dependencyName: string): string => {
  return pjson.dependencies[dependencyName]
    ?? pjson.devDependencies[dependencyName]
    ?? ''
}
