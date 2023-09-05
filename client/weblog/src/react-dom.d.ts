declare module 'react-dom' {
    export function createRoot(
      container: Element | null | DocumentFragment | React.ReactPortal,
      options?: { hydrate?: boolean }
    ): {
      render(element: React.ReactElement, callback?: () => void): void;
    };
  }
  