import {
  IonIcon,
  IonPopover,
  IonContent,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import { useRef, useState } from 'react';

export function Dropdown({
  title,
  disabled,
  value,
  onChange,
  options,
}: {
  title: string;
  disabled?: boolean;
  value: null | string;
  onChange?(value: null | string): void;
  options: { value: string; text: string }[];
}) {
  const [node, setNode] = useState<null | HTMLDivElement>(null);
  const popoverRef = useRef<HTMLIonPopoverElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const option = value
    ? options.find((option) => option.value === value)
    : null;

  const openPopover = () => {
    popoverRef.current!.event = { target: node };
    setIsPopoverOpen(true);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <div ref={setNode} className="dropdown">
        <button disabled={disabled} onClick={openPopover}>
          <span>
            {title}
            {option ? ` ${option.text}` : ''}
          </span>
          <IonIcon icon={chevronDown} />
        </button>
      </div>
      <IonPopover
        ref={popoverRef}
        arrow={false}
        showBackdrop={false}
        isOpen={isPopoverOpen}
        onDidDismiss={closePopover}
        className="dropdown-popover"
      >
        <IonContent>
          {[{ value: null, text: '' }, ...options].map(
            ({ value, text }, index) => (
              <IonItem
                key={index}
                button
                lines="none"
                {...(option?.value === value && {
                  color: 'light',
                })}
                onClick={() => {
                  closePopover();
                  if (option?.value !== value) {
                    onChange?.(value);
                  }
                }}
              >
                <IonLabel>{text}</IonLabel>
              </IonItem>
            )
          )}
        </IonContent>
      </IonPopover>
    </>
  );
}
