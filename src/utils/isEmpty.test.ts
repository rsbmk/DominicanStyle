import { describe, expect, it } from "vitest";
import { isEmpty } from "./isEmpty";

describe('isEmpty util function', () => {
  it('returns true for empty string', () => {
    expect(isEmpty).toBeTypeOf('function')
  })

  it('return false if the parameter is null or undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('returns true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('returns false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false)
  })

  it('returns true for empty object', () => {
    expect(isEmpty({})).toBe(true)
  })

  it('returns false for non-empty object', () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it('return true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('return false for non-empty array', () => {
    expect(isEmpty([1, "hol"])).toBe(false)
  })

  it('return the value of boolean', () => {
    expect(isEmpty(true)).toBe(false)
    expect(isEmpty(false)).toBe(true)
  })

})