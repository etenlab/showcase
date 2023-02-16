import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { arrowBackOutline } from 'ionicons/icons';

import './styles/layout.css';
import { BellIcon, BurgerMenuIcon } from './icons';

export function Layout({
  backRoute,
  breadcrumb,
  headerContent,
  children,
}: {
  backRoute?: string;
  breadcrumb?: string;
  headerContent?: ReactNode;
  children?: ReactNode;
}) {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Showcase</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <BellIcon />
            </IonButton>
            <IonButton>
              <BurgerMenuIcon />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="layout-header">
          <h3
            {...(backRoute && {
              style: { cursor: 'pointer' },
              onClick: () => history.push(backRoute),
            })}
          >
            {backRoute && (
              <IonIcon
                icon={arrowBackOutline}
                style={{
                  width: 22,
                  fontSize: 22,
                  padding: 0,
                  height: 24,
                  marginRight: 8,
                }}
              />
            )}
            <span>Versification{breadcrumb ? ` / ${breadcrumb}` : ''}</span>
          </h3>
          {headerContent}
        </div>
        <div className="layout-content">{children}</div>
      </IonContent>
    </IonPage>
  );
}
