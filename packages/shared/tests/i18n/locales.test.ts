import { describe, expect, test } from 'vitest'
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE
} from '../../src/i18n/locales'

describe.concurrent('i18n config', () => {
  test('SUPPORTED_LANGUAGES is an array', () => {
    expect(SUPPORTED_LANGUAGES).toBeInstanceOf(Array)
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(0)
  })

  test('SUPPORTED_LOCALES is an array with same length as SUPPORTED_LANGUAGES', () => {
    expect(SUPPORTED_LOCALES).toBeInstanceOf(Array)
    expect(SUPPORTED_LOCALES.length).toEqual(SUPPORTED_LANGUAGES.length)
  })

  test('DEFAULT_LANGUAGE is defined', () => {
    expect(DEFAULT_LANGUAGE).toBeTruthy()
    expect(DEFAULT_LANGUAGE).toBeInstanceOf(Object)
    expect(DEFAULT_LANGUAGE.locale).toBeTruthy()
    expect(DEFAULT_LANGUAGE.name).toBeTruthy()
    expect(DEFAULT_LANGUAGE.default).toBeTruthy()
  })

  test('DEFAULT_LOCALE is defined and is string', () => {
    expect(DEFAULT_LOCALE).toBeTruthy()
    expect(typeof DEFAULT_LOCALE).toBe('string')
  })
})
