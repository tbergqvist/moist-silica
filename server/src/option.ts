import { Result } from "./result";

export class Optional<T> {

  constructor(
    private _value: T
  ) {
  }

  static Some<T>(value: T) {
    return new Optional<T>(value);
  }
  
  static None = new Optional<any>(undefined);

  isSome() {
    return this._value !== undefined;
  }

  isNone(): boolean {
    return this == Optional.None;
  }

  unwrap() {
    if (this._value === undefined) throw "WOOP WOOP";
    return this._value;
  }

  filter(filterFunc: (value: T)=>boolean): Optional<T> {
    if (this.isNone() || !filterFunc(this._value)) {
      return Optional.None;
    } else {
      return this;
    }
  }

  map<U>(mapFunc: (value: T)=>U): Optional<U> {
    if (this.isNone()) {
      return Optional.None;
    }

    return Optional.Some(mapFunc(this._value));
  }

  mapOr<U>(defaultValue: U, mapFunc: (value: T)=>U): U {
    return this.map(mapFunc).unwrapOr(defaultValue);
  }

  unwrapOr(defaultValue: T): T {
    if (this.isNone()) {
      return defaultValue;
    }
    return this._value;
  }

  okOr<E>(errorValue: E): Result<T, E> {
    if (this.isNone()) {
      return Result.Error(errorValue);
    }
    return Result.Ok(this._value);
  }
}