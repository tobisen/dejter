import type { ObjectDirective } from "vue";
const states = new WeakMap<
  HTMLElement,
  {
    previous: HTMLElement | null;
    overflow: string;
    handle: (e: KeyboardEvent) => void;
  }
>();
export const focusTrap: ObjectDirective<HTMLElement> = {
  mounted(el) {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
        ),
      );
    const handle = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0],
        last = items.at(-1);
      if (!first || !last) {
        e.preventDefault();
        el.focus();
        return;
      }
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !el.contains(document.activeElement))
      ) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !el.contains(document.activeElement))
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    el.addEventListener("keydown", handle);
    states.set(el, { previous, handle, overflow });
    queueMicrotask(() =>
      (
        el.querySelector<HTMLElement>('input:not([type="checkbox"]), button') ??
        el
      ).focus(),
    );
  },
  unmounted(el) {
    const state = states.get(el);
    if (state) {
      document.body.style.overflow = state.overflow;
      el.removeEventListener("keydown", state.handle);
      if (state.previous?.isConnected) state.previous.focus();
    }
    states.delete(el);
  },
};
