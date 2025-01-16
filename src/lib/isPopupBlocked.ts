export function isPopupBlocked(popUp: Window | null): boolean {
  return !popUp || popUp.closed || typeof popUp.closed === 'undefined';
}
