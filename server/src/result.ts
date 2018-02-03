export class Result<T, E> {
  constructor(
    private _value: T,
    private _error: E
  ) {
    console.assert(_value === undefined || _error === undefined, "Either value or error needs to be undefined in Result!");
  }

  static Ok<T>(value: T) {
    return new Result<T, any>(value, undefined);
  }
  
  static Error<E>(error: E) {
    return new Result<any, E>(undefined, error);
  }

  isOk() {
    return this._value !== undefined;
  }

  isError() {
    return this._error !== undefined;
  }

  unwrap() {
    if (this._value === undefined) throw "WOOP WOOP";
    return this._value;
  }

  unwrapError() {
    if (this._error === undefined) throw "WOOP WOOP";
    return this._error;
  }

  unwrapOr(defaultValue: T) {
    if (this.isError()) {
      return defaultValue;
    } else {
      return this._value;
    }
  }

  mapError<U>(mapErrFunc: (error: E)=>U): Result<T, U> {
    if (this.isOk()) {
      return Result.Ok(this._value);
    }

    return Result.Error(mapErrFunc(this._error));
  }

  mapOr<U>(defaultValue: U, mapFunc: (value: T)=>U): U {
    return this.map(mapFunc).unwrapOr(defaultValue);
  }

  map<U>(mapFunc: (value: T)=>U): Result<U, E> {
    if (this.isError()) {
      return Result.Error(this._error);
    }

    return Result.Ok(mapFunc(this._value));
  }

  andThen<U>(func: (value: T)=>Result<U, E>): Result<U, E> {
    if (this.isError()) {
      return Result.Error(this._error);
    } else {
      return func(this._value);
    }
  }
}