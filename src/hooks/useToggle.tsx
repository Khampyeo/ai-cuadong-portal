import { useCallback, useState } from "react";

export const useToggle = (
  initialState = false
): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(
    (): void => setState((state: boolean) => !state),
    []
  );

  const close = useCallback((): void => setState(false), []);

  const open = useCallback((): void => setState(true), []);

  return [state, toggle, close, open];
};
