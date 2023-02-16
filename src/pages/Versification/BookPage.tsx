import { IonButtons, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles/index.css';
import './styles/rowView.css';
import './styles/columnView.css';
import './styles/lineBreakView.css';
import { Book, VersificationConfig, useVersificationContext } from '.';
import { Layout } from './Layout';
import { RowViewIcon, ColumnViewIcon, LineBreakViewIcon } from './icons';
import { Dropdown } from './Dropdown';
import { NodeData } from './NodeData';
import { OriginalLabel } from './OriginalLabel';

const views = [
  { name: 'row', Icon: RowViewIcon, View: RowView },
  { name: 'column', Icon: ColumnViewIcon, View: ColumnView },
  { name: 'lineBreak', Icon: LineBreakViewIcon, View: LineBreakView },
];

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { books } = useVersificationContext();
  const book = books.find(({ node_id }) => node_id === +bookId)!;
  const [activeViewName, setActiveViewName] = useState(views[0].name);
  const { View } = views.find(({ name }) => name === activeViewName)!;
  const [filteredChapterId, setFilteredChapterId] = useState<null | string>(
    null
  );
  const [filteredVerseId, setFilteredVerseId] = useState<null | string>(null);
  const filteredChapter = filteredChapterId
    ? book.chapters.find(
        ({ node_id }) => node_id.toString() === filteredChapterId
      )
    : null;
  const filteredBook = filteredChapterId
    ? {
        ...book,
        chapters: book.chapters
          .filter(({ node_id }) => node_id.toString() === filteredChapterId)
          .map((chapter) => ({
            ...chapter,
            verses: filteredVerseId
              ? chapter.verses.filter(
                  ({ node_id }) => node_id.toString() === filteredVerseId
                )
              : chapter.verses,
          })),
      }
    : book;

  return (
    <Layout
      backRoute="/versification"
      breadcrumb={`#${book.node_id} ${book.properties.name}`}
      headerContent={
        <IonGrid>
          <IonRow>
            <IonCol>
              <Dropdown
                title="# Chapter"
                value={filteredChapterId}
                onChange={(value) => {
                  setFilteredVerseId(null);
                  setFilteredChapterId(value);
                }}
                options={book.chapters.map(({ node_id, properties }) => ({
                  value: node_id.toString(),
                  text: properties['chapter-identifier'],
                }))}
              />
            </IonCol>
            <IonCol>
              <Dropdown
                title="# Verse"
                disabled={!filteredChapterId}
                value={filteredVerseId}
                onChange={setFilteredVerseId}
                options={
                  filteredChapter
                    ? filteredChapter.verses.map(({ node_id, properties }) => ({
                        value: node_id.toString(),
                        text: properties['verse-identifier'],
                      }))
                    : []
                }
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      }
    >
      <div className="content-header">
        <div className="content-title">Versification table</div>
        <IonButtons>
          {views.map(({ name, Icon }) => (
            <IonButton
              key={name}
              fill="clear"
              {...(name === activeViewName
                ? { className: 'active' }
                : { onClick: () => setActiveViewName(name) })}
            >
              <Icon />
            </IonButton>
          ))}
        </IonButtons>
      </div>
      <View book={filteredBook} />
    </Layout>
  );
}

function RowView({ book }: { book: Book }) {
  return (
    <div className="row-view">
      <div className="row-view-inner">
        <div className="section">
          <div className="section-header">Original</div>
          <div className="section-content">
            {book.chapters.map((chapter) => {
              const value = `Ch. ${chapter.properties['chapter-identifier']}`;

              return (
                <Fragment key={chapter.node_id}>
                  <OriginalLabel
                    value={value}
                    config={{
                      type: 'CHAPTER',
                      value: chapter.properties['chapter-identifier'],
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                  {chapter.verses.map((verse) => {
                    const value = `v${verse.properties['verse-identifier']}`;

                    return (
                      <Fragment key={verse.node_id}>
                        <OriginalLabel
                          value={value}
                          config={{
                            type: 'VERSE',
                            value: verse.properties['verse-identifier'],
                            bookId: book.node_id,
                            chapterId: chapter.node_id,
                            verseId: verse.node_id,
                          }}
                          style={{ margin: '0 10px' }}
                        />
                        <span>{verse.text}</span>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="section">
          <div className="section-header">Translation</div>
          <div className="section-content">
            {book.chapters.map((chapter) => (
              <Fragment key={chapter.node_id}>
                {chapter.versification.map((item, index) => (
                  <NodeData
                    key={index}
                    inline
                    {...(index && { style: { marginLeft: 20 } })}
                    label={`Ch. ${item['chapter-identifier']}`}
                    config={{
                      type: 'CHAPTER',
                      value: chapter.properties['chapter-identifier'],
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                ))}
                {chapter.verses.map((verse) => (
                  <Fragment key={verse.node_id}>
                    {verse.versification.map((item, index) => (
                      <NodeData
                        key={index}
                        inline
                        style={{ marginLeft: 20 }}
                        label={`v${item['verse-identifier']}`}
                        config={{
                          type: 'VERSE',
                          value: verse.properties['verse-identifier'],
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                          verseId: verse.node_id,
                        }}
                      />
                    ))}
                    <span style={{ marginLeft: 15 }}>{verse.text}</span>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColumnView({ book }: { book: Book }) {
  const buildItems = (original = true) => {
    const list: {
      type: 'CHAPTER_NUMBER' | 'VERSE_NUMBER' | 'WORD';
      value: string;
      config?: VersificationConfig;
    }[] = [];

    for (const chapter of book.chapters) {
      const { node_id, properties, versification, verses } = chapter;
      const numberSources = original ? [properties] : versification;

      for (const numberSource of numberSources) {
        const value = `Chapter ${numberSource['chapter-identifier']}`;

        list.push({
          type: 'CHAPTER_NUMBER' as const,
          value,
          config: {
            type: 'CHAPTER',
            value: properties['chapter-identifier'],
            bookId: book.node_id,
            chapterId: node_id,
          },
        });
      }

      for (const { node_id, properties, versification, text } of verses) {
        const numberSources = original ? [properties] : versification;

        for (const numberSource of numberSources) {
          const value = `Verse ${numberSource['verse-identifier']}`;

          list.push({
            type: 'VERSE_NUMBER' as const,
            value,
            config: {
              type: 'VERSE',
              value: properties['verse-identifier'],
              bookId: book.node_id,
              chapterId: chapter.node_id,
              verseId: node_id,
            },
          });
        }

        for (const word of text.split(' ')) {
          list.push({
            type: 'WORD' as const,
            value: word,
          });
        }
      }
    }

    return list;
  };

  const original = buildItems();
  const translation = buildItems(false);
  const numRows = Math.max(original.length, translation.length);

  return (
    <div className="column-view">
      <IonGrid>
        <IonRow className="section-header">
          <IonCol>Original</IonCol>
          <IonCol>Translation</IonCol>
        </IonRow>
        {[...Array(numRows)].map((val, index) => {
          const originalItem = original[index] ? original[index] : null;
          const translationItem = translation[index]
            ? translation[index]
            : null;

          return (
            <IonRow key={index}>
              <IonCol>
                {originalItem && (
                  <>
                    {originalItem.type !== 'WORD' && originalItem.config && (
                      <OriginalLabel
                        value={originalItem.value}
                        config={originalItem.config}
                      />
                    )}
                    {originalItem.type === 'WORD' && originalItem.value}
                  </>
                )}
              </IonCol>
              <IonCol>
                {translationItem && (
                  <>
                    {translationItem.type !== 'WORD' &&
                      translationItem.config && (
                        <NodeData
                          col
                          label={translationItem.value}
                          config={translationItem.config}
                        />
                      )}
                    {translationItem.type === 'WORD' && translationItem.value}
                  </>
                )}
              </IonCol>
            </IonRow>
          );
        })}
      </IonGrid>
    </div>
  );
}

function LineBreakView({ book }: { book: Book }) {
  return (
    <div className="line-break-view">
      <div className="section">
        <div className="section-header">Original</div>
        <div className="section-content space-y-2">
          {book.chapters.map((chapter) => {
            const value = `Ch. ${chapter.properties['chapter-identifier']}`;

            return (
              <Fragment key={chapter.node_id}>
                <div>
                  <OriginalLabel
                    value={value}
                    config={{
                      type: 'CHAPTER',
                      value: chapter.properties['chapter-identifier'],
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                </div>
                {chapter.verses.map((verse) => {
                  const value = `v${verse.properties['verse-identifier']}`;

                  return (
                    <div key={verse.node_id}>
                      <OriginalLabel
                        value={value}
                        config={{
                          type: 'VERSE',
                          value: verse.properties['verse-identifier'],
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                          verseId: verse.node_id,
                        }}
                      />
                      <span> {verse.text}</span>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="section">
        <div className="section-header">Translation</div>
        <div className="section-content space-y-2">
          {book.chapters.map((chapter) => (
            <Fragment key={chapter.node_id}>
              {chapter.versification.map((item, index) => (
                <div key={index}>
                  <NodeData
                    inline
                    label={`Ch. ${item['chapter-identifier']}`}
                    config={{
                      type: 'CHAPTER',
                      value: chapter.properties['chapter-identifier'],
                      bookId: book.node_id,
                      chapterId: chapter.node_id,
                    }}
                  />
                </div>
              ))}
              {chapter.verses.map((verse) => (
                <Fragment key={verse.node_id}>
                  {verse.versification.map((item, index) => (
                    <div key={index}>
                      <NodeData
                        inline
                        label={`v${item['verse-identifier']}`}
                        config={{
                          type: 'VERSE',
                          value: verse.properties['verse-identifier'],
                          bookId: book.node_id,
                          chapterId: chapter.node_id,
                          verseId: verse.node_id,
                        }}
                      />
                    </div>
                  ))}
                  <div>{verse.text}</div>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
