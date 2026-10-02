/** Puts the caret at the end of the field without scrolling the page. */
export function focusComposerAtEnd(field: HTMLTextAreaElement | null) {
  if (!field) return
  field.focus({ preventScroll: true })
  const end = field.value.length
  field.setSelectionRange(end, end)
  // In single-line mode (md+) the field scrolls horizontally: keep the caret in view.
  field.scrollLeft = field.scrollWidth
}
