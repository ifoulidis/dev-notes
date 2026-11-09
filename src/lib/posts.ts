import { getCollection, type CollectionEntry } from 'astro:content';
import readingTime from 'reading-time';

export type Post = CollectionEntry<'posts'> & {
  /** e.g. "5 min read". */
  readingTime: string;
};

/** Posts with their reading times, newest first. Drafts only show in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries
    .map((entry) => ({ ...entry, readingTime: readingTime(entry.body ?? '').text }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dateFormat = new Intl.DateTimeFormat('en-NZ', { dateStyle: 'long' });

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}
