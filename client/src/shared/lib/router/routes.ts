import { RouteParams, inject, parse } from 'regexparam';
import { Match, useRoute } from 'wouter';

type AllowNumbers<T> = {
  [P in keyof T]: T[P] | number;
};

type BuildFn<T extends string> =
  Record<string, never> extends Required<RouteParams<T>>
    ? () => string
    : Record<string, never> extends RouteParams<T>
      ? (params?: Simplify<AllowNumbers<RouteParams<T>>>) => string
      : (params: Simplify<AllowNumbers<RouteParams<T>>>) => string;

type Routes<T extends Record<string, string>> = Simplify<{
  [K in keyof T]: {
    pattern: T[K];
    build: BuildFn<T[K]>;
    useRoute: () => Simplify<Match<RouteParams<T[K]>>>;
  };
}>;

const buildSearchParamsString = (search?: Record<string, string>) =>
  search ? `?${new URLSearchParams(search).toString()}` : '';

const buildRoutes = <T extends Record<string, string>>(patterns: T): Routes<T> => {
  return Object.keys(patterns).reduce((acc, key) => {
    const pattern = patterns[key];
    const hasParams = parse(pattern).keys.length > 0;

    const build = (
      hasParams
        ? (params: RouteParams<typeof pattern>, search?: Record<string, string>) =>
            `${inject(pattern, params || {})}${buildSearchParamsString(search)}`
        : (search?: Record<string, string>) => `${pattern}${buildSearchParamsString(search)}`
    ) as BuildFn<typeof pattern>;

    // @ts-expect-error object builder
    acc[key] = {
      pattern,
      build,
      useRoute: () => useRoute(pattern),
    };

    return acc;
  }, {} as Routes<T>);
};

export const routes = buildRoutes({
  admin: '/admin',
  login: '/login',
  registration: '/registration',
  cart: '/cart',
  device: '/device/:id',
  shop: '/',
} as const);
