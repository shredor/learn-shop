declare type RootStore = import('@/app/store/store').RootStore;

interface CSSStyleDeclaration {
  viewTransitionName: string;
}

interface Document {
  startViewTransition?: (cb: () => void) => void;
}
