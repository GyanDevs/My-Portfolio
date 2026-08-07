type ScrollLockListener = () => void;

let lockCount = 0;
let splitScrollActive = false;
const listeners = new Set<ScrollLockListener>();

function notifyScrollControlListeners() {
  listeners.forEach((listener) => listener());
}

export function isScrollLocked(): boolean {
  return lockCount > 0;
}

export function setSplitScrollActive(active: boolean) {
  if (splitScrollActive === active) return;
  splitScrollActive = active;
  notifyScrollControlListeners();
}

export function shouldRootLenisRun(): boolean {
  return !isScrollLocked() && !splitScrollActive;
}

export function acquireScrollLock(): () => void {
  lockCount += 1;
  notifyScrollControlListeners();
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    notifyScrollControlListeners();
  };
}

export function subscribeScrollLock(listener: ScrollLockListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
