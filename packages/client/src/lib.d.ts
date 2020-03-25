/// <reference types="faker" />

declare module 'test-data-bot' {
  export type BuilderFunction<T> = (overrideFields?: Partial<T>) => T
  export type BuilderValue<T> = ((...args: any[]) => T) | T

  export interface Builder<T extends object> extends BuilderFunction<T> {
    fields(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
    map(fieldsParams: { [K in keyof T]: BuilderValue<T[K]> }): Builder<T>
  }

  export function build<T extends object>(name?: string): Builder<T>
  export function bool(): boolean
  export function incrementingId(): number
  export function sequence<T>(sequenceFn: (id: number) => T): T
  export function perBuild<T>(buildFn: (...args: any[]) => T): T
  export function oneOf<T>(...oneOfOptions: T[]): T
  export function numberBetween(min: number, max: number): number
  export function arrayOf<T>(builder: BuilderValue<T>, count: number): T[]
  export function fake<T>(fakeFn: (f: Faker.FakerStatic) => T): T
}
