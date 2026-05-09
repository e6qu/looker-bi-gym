declare module "bun:sqlite" {
  export type SqlValue = string | number | bigint | boolean | null | Uint8Array;

  export type DatabaseOptions = {
    readonly readonly?: boolean;
  };

  export class Statement<
    TRow = unknown,
    TParams extends readonly SqlValue[] = readonly SqlValue[],
  > {
    readonly rowType?: TRow;
    run(...params: TParams): void;
    get(...params: TParams): TRow | null;
  }

  export class Database {
    constructor(filename: string, options?: DatabaseOptions);
    run(sql: string, ...params: readonly SqlValue[]): void;
    query<
      TRow = unknown,
      TParams extends readonly SqlValue[] = readonly SqlValue[],
    >(sql: string): Statement<TRow, TParams>;
    transaction<TArgs extends readonly unknown[], TResult>(
      fn: (...args: TArgs) => TResult,
    ): (...args: TArgs) => TResult;
    close(): void;
  }
}
