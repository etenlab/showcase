
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonRouterOutlet,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

import { AccountMenu } from '../common/AccountMenu';
import { Dataset } from '../components/Dataset';

const Tab1: React.FC = () => {

  

  return (
    <IonPage>
      <IonReactRouter>
      <IonMenu css={{'--width': '480px'}} contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Data Sets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem href="/tab1/iso-639-3" >
              <IonLabel>ISO 639-3 </IonLabel>
            </IonItem>
            <IonItem href="/tab1/iso-639-5">
              <IonLabel>ISO 639-5 </IonLabel>
            </IonItem>
            <IonItem href="/tab1/iso-639-3-macrolanguages">
              <IonLabel>ISO 639-3 Macrolanguages</IonLabel>
            </IonItem>
            <IonItem href="/tab1/iso-639-3-names">
              <IonLabel>ISO 639-3 Names</IonLabel>
            </IonItem>
            <IonItem href="/tab1/iso-639-3-retirements">
              <IonLabel>ISO 639-3 Retirements</IonLabel>
            </IonItem>
            <IonItem href="/tab1/glottolog-family">
              <IonLabel>Glottolog Language Family Listing</IonLabel>
            </IonItem>
            <IonItem href="/tab1/glottolog-language">
              <IonLabel>Glottolog Language Listing</IonLabel>
            </IonItem>
            <IonItem href="/tab1/gsec-listing-of-people-groups">
              <IonLabel>GSEC Listing Of People Groups</IonLabel>
            </IonItem>
            <IonItem href="/tab1/gsec-listing-of-unengaged-unreached-people-groups">
              <IonLabel>GSEC Listing Of Unengaged Unreached People Groups</IonLabel>
            </IonItem>
            <IonItem href="/tab1/gsec-listing-of-unreached-people-groups">
              <IonLabel>GSEC Listing Of Unreached People Groups</IonLabel>
            </IonItem>
            <IonItem href="/tab1/gsec-listing-of-uupg-100k">
              <IonLabel>GSEC Listing Of UUPG 100k</IonLabel>
            </IonItem>
            <IonItem href="/tab1/gsec-listing-of-uupg-100k-removals">
              <IonLabel>GSEC Listing Of UUPG 100k Removals</IonLabel>
            </IonItem>
            <IonItem href="/tab1/people-groups-data-only">
              <IonLabel>People Groups Data Only</IonLabel>
            </IonItem>
            <IonItem href="/tab1/progress-bible-language-details">
              <IonLabel>Progress Bible Language Details</IonLabel>
            </IonItem>
            <IonItem href="/tab1/rod-alternatenameindex">
              <IonLabel>RoD Alternatename Index</IonLabel>
            </IonItem>
            <IonItem href="/tab1/rod-changelist">
              <IonLabel>RoD Change List</IonLabel>
            </IonItem>
            <IonItem href="/tab1/rod-dialects">
              <IonLabel>RoD Dialects</IonLabel>
            </IonItem>
            <IonItem href="/tab1/sil-country-codes">
              <IonLabel>SIL Country Codes</IonLabel>
            </IonItem>
            <IonItem href="/tab1/sil-language-codes">
              <IonLabel>SIL Language Codes</IonLabel>
            </IonItem>
            <IonItem href="/tab1/sil-language-index">
              <IonLabel>SIL Language Index</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-additional-languages">
              <IonLabel>unfoldingWord Additional Languages</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-countries-list">
              <IonLabel>unfoldingWord Countries List</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-langnames">
              <IonLabel>unfoldingWord Language Names</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages">
              <IonLabel>unfoldingWord Languages</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-bible-portions">
              <IonLabel>unfoldingWord Languages With Bible Portions</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-gospel-recording">
              <IonLabel>unfoldingWord Languages With Gospel Recording</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-jesus-film">
              <IonLabel>unfoldingWord Languages With Jesus Film</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-one-story-bible-stories">
              <IonLabel>unfoldingWord Languages With One Story Bible Stories</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-open-bible-stories">
              <IonLabel>unfoldingWord Languages With Open Bible Stories</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-languages-with-radio-broadcast">
              <IonLabel>unfoldingWord Languages With Radio Broadcast</IonLabel>
            </IonItem>
            <IonItem href="/tab1/uf-networks">
              <IonLabel>unfoldingWord Networks</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Data Sets A</IonTitle>
          <IonButtons slot="primary">
            <AccountMenu />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen id="main-content" scrollY={true}>
        <IonRouterOutlet>
          <Route path="/tab1/:table" component={Dataset}  />
          <Route exact path="/tab1">
            <Redirect to="/tab1/iso-639-3" />
          </Route>
        </IonRouterOutlet>
      </IonContent>
      
      </IonReactRouter>
    </IonPage>
  );
};

export default Tab1;
