import { LOREM_IPSUM } from './constants.mts';

/**
 * Extract unique words from the given text filtered by length.
 * @param text The source string.
 * @param minLength The minimum length of words to include.
 * @returns Filtered unique words.
 */
export const extractWords = (text: string, minLength = 3): readonly string[] =>
  Array.from(
    new Set(
      text
        .split(/\s+/)
        .map((w) => w.replace(/[^a-zA-Z]/g, ''))
        .filter(({ length }) => length >= minLength),
    ),
  );

/**
 * Return sample words from {@link LOREM_TEXT}.
 * @param minLength Minimum length of each word.
 * @returns The words array.
 */
export const loremWords = (minLength = 3): readonly string[] =>
  extractWords(LOREM_IPSUM, minLength);
