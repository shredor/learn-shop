declare type Simplify<T> = { [K in keyof T]: T[K] } & unknown;
