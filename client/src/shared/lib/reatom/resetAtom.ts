import { action, atom, withAssign } from '@reatom/framework';

export const createResetAtom = (name: string) =>
  atom(0, name).pipe(
    withAssign((resetAtom, name) => ({
      reset: action((ctx) => resetAtom(ctx, (prev) => prev + 1), `${name}._reset`),
    })),
  );
