type Node<T> = {
  node_id: number;
  node_type: T;
  propertyKeys: {
    property_key: string;
    values: {
      property_value: {
        value: string;
      };
      upVotes: number;
      downVotes: number;
      posts: {
        id: number;
      }[];
    }[];
  }[];
};
type NestedRelationships<T> = {
  nestedRelationships: {
    toNode: T;
  }[];
};

export type Bible = Node<'bible'> & NestedRelationships<Book>;
export type Book = Node<'book'> & NestedRelationships<Chapter>;
export type Chapter = Node<'chapter'> & NestedRelationships<Verse>;
export type Verse = Node<'verse'> & NestedRelationships<WordSequence>;
type WordSequence = Node<'word-sequence'> & NestedRelationships<Word>;
type Word = Node<'word'>;

type VersificationChapterConfig = {
  type: 'CHAPTER';
  value: string;
  values: string[];
  bibleId: number;
  bookId: number;
  chapterId: number;
};
type VersificationVerseConfig = {
  type: 'VERSE';
  value: string;
  values: string[];
  bibleId: number;
  bookId: number;
  chapterId: number;
  verseId: number;
};
export type VersificationConfig =
  | VersificationChapterConfig
  | VersificationVerseConfig;
