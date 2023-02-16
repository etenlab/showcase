import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

import { BookListPage } from './BookListPage';
import { BookPage } from './BookPage';

export type Book = {
  node_id: number;
  properties: { name: string };
  chapters: {
    node_id: number;
    properties: { 'chapter-identifier': string };
    versification: {
      'chapter-identifier': string;
    }[];
    verses: {
      node_id: number;
      properties: { 'verse-identifier': string };
      versification: {
        'verse-identifier': string;
      }[];
      text: string;
    }[];
  }[];
};

type VersificationChapterConfig = {
  type: 'CHAPTER';
  value: string;
  bookId: number;
  chapterId: number;
};
type VersificationVerseConfig = {
  type: 'VERSE';
  value: string;
  bookId: number;
  chapterId: number;
  verseId: number;
};
export type VersificationConfig =
  | VersificationChapterConfig
  | VersificationVerseConfig;

type VersificationContextType = {
  books: Book[];
  onBookAdd(): void;
  onIdentifierAdd(params: {
    identifier: string;
    config: VersificationConfig;
  }): void;
};

const VersificationContext = createContext<VersificationContextType>(null!);

export function useVersificationContext() {
  return useContext(VersificationContext);
}

function createBook(node_id: number): Book {
  const verse1 = {
    node_id: 3,
    properties: { 'verse-identifier': '1' },
    versification: [{ 'verse-identifier': '1' }],
    text: 'In the beginning God created heaven and earth...',
  };
  const verse2 = {
    node_id: 4,
    properties: { 'verse-identifier': '2' },
    versification: [
      { 'verse-identifier': '2' },
      { 'verse-identifier': '1' },
      { 'verse-identifier': '3' },
    ],
    text: 'And the earth was void and empty...',
  };
  const verse3 = {
    node_id: 5,
    properties: { 'verse-identifier': '3' },
    versification: [{ 'verse-identifier': '3' }],
    text: 'And God said: Be light made. And light was made.',
  };
  const chapter1 = {
    node_id: 2,
    properties: { 'chapter-identifier': '1' },
    versification: [
      { 'chapter-identifier': '1' },
      { 'chapter-identifier': '2' },
    ],
    verses: [verse1, verse2, verse3],
  };

  return {
    node_id,
    properties: { name: 'Bible Book' },
    chapters: [chapter1],
  };
}

export function VersificationPage() {
  const [books, setBooks] = useState(
    [...Array(5)].map((value, index) => createBook(index + 1))
  );

  function handleBookAdd() {
    const maxId = Math.max.apply(
      null,
      books.map(({ node_id }) => node_id)
    );
    setBooks([...books, createBook(maxId + 1)]);
  }

  function handleIdentifierAdd({
    identifier,
    config,
  }: {
    identifier: string;
    config: VersificationConfig;
  }) {
    setBooks(
      books.map((book) => {
        if (book.node_id !== config.bookId) return book;

        return {
          ...book,
          chapters: book.chapters.map((chapter) => {
            if (chapter.node_id !== config.chapterId) return chapter;

            return {
              ...chapter,
              ...(config.type === 'CHAPTER'
                ? {
                    versification: [
                      ...chapter.versification,
                      { 'chapter-identifier': identifier },
                    ],
                  }
                : {
                    verses: chapter.verses.map((verse) => {
                      if (verse.node_id !== config.verseId) return verse;

                      return {
                        ...verse,
                        versification: [
                          ...verse.versification,
                          { 'verse-identifier': identifier },
                        ],
                      };
                    }),
                  }),
            };
          }),
        };
      })
    );
  }

  return (
    <IonRouterOutlet>
      <VersificationContext.Provider
        value={{
          books,
          onBookAdd: handleBookAdd,
          onIdentifierAdd: handleIdentifierAdd,
        }}
      >
        <Route exact path="/versification/book/:bookId">
          <BookPage />
        </Route>
        <Route exact path="/versification">
          <BookListPage />
        </Route>
      </VersificationContext.Provider>
    </IonRouterOutlet>
  );
}
