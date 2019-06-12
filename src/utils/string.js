// @flow

export function getInitials(text: string = ''): string {
  const words = text
    .replace(/\s\s+/g, ' ')
    .toUpperCase()
    .split(' ');
  return (
    words[0].substring(0, 1) +
    (words.length > 1 ? words[words.length - 1].substring(0, 1) : '')
  );
}

export function reduceToIndex(text: string, base: number): number {
  return text.split('').reduce((a, x) => a + x.charCodeAt(0), 0) % base;
}
