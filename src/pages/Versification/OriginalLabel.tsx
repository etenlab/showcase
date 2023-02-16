import {
  IonButton,
  IonContent,
  IonPopover,
  IonInput,
  IonLabel,
  IonItem,
} from '@ionic/react';
import { useEffect, useRef, useState, CSSProperties } from 'react';

import { useVersificationContext, VersificationConfig } from '.';

export function OriginalLabel({
  value,
  config,
  style,
}: {
  value: string;
  config: VersificationConfig;
  style?: CSSProperties;
}) {
  const { books, onIdentifierAdd } = useVersificationContext();
  const popoverRef = useRef<HTMLIonPopoverElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [input, setInput] = useState('');
  const book = books.find(({ node_id }) => node_id === config.bookId)!;
  const chapter = book.chapters.find(
    ({ node_id }) => node_id === config.chapterId
  )!;
  const node =
    config.type === 'CHAPTER'
      ? chapter
      : chapter.verses.find(({ node_id }) => node_id === config.verseId)!;
  const label = `# ${config.type.charAt(0)}${config.type
    .slice(1)
    .toLowerCase()}`;

  const openPopover = (event: any) => {
    popoverRef.current!.event = event;
    setIsPopoverOpen(true);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    setInput('');
  };

  function fixPositioning() {
    if (isPopoverOpen && popoverRef.current) {
      const content =
        popoverRef.current.shadowRoot?.querySelector<HTMLDivElement>(
          '.popover-content'
        );

      if (content) {
        const rect = content.getBoundingClientRect();
        const maxTop = window.innerHeight - rect.height - 15;

        if (rect.top > maxTop) {
          content.style.transition = 'top 150ms';
          content.style.top = `${maxTop}px`;
        }
      }
    }
  }

  useEffect(() => {
    setTimeout(fixPositioning, 0);
    setTimeout(fixPositioning, 100);
    setTimeout(fixPositioning, 200);
  });

  return (
    <>
      <strong
        className={`original-label${isPopoverOpen ? ' active' : ''}`}
        style={style}
        onClick={openPopover}
      >
        <span>{value}</span>
      </strong>
      <IonPopover
        ref={popoverRef}
        arrow={false}
        showBackdrop={false}
        isOpen={isPopoverOpen}
        className="original-label-popover"
        onDidDismiss={closePopover}
      >
        <IonContent class="ion-padding">
          <h6>Start of a new</h6>
          <div className="space-y-3" style={{ marginBottom: 15, fontSize: 12 }}>
            <div>
              <IonLabel>New value</IonLabel>
              <IonItem className="input-item">
                <IonLabel>{label}</IonLabel>
                <IonInput
                  value={input}
                  onIonChange={(value) =>
                    setInput(value.target.value?.toString() || '')
                  }
                  placeholder="Type an identifier"
                />
              </IonItem>
            </div>
            <div className="space-y-1">
              <div>
                <IonLabel style={{ marginRight: 5 }}>Original:</IonLabel>
                <span>
                  {label} {config.value}
                </span>
              </div>
              <div>
                <IonLabel style={{ marginRight: 5 }}>Translations:</IonLabel>
                {node.versification
                  .map(
                    (item, index) =>
                      `${label} ${
                        'verse-identifier' in item
                          ? item['verse-identifier']
                          : item['chapter-identifier']
                      }`
                  )
                  .join(', ')}
              </div>
            </div>
          </div>
          <IonButton
            expand="block"
            color="success"
            onClick={() => {
              if (!input.length) return;
              onIdentifierAdd({ identifier: input, config });
              closePopover();
            }}
          >
            Save
          </IonButton>
          <IonButton
            expand="block"
            fill="clear"
            color="medium"
            onClick={closePopover}
          >
            Cancel
          </IonButton>
        </IonContent>
      </IonPopover>
    </>
  );
}
