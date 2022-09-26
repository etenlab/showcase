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
import { Iso6392 } from '../components/iso6392';
import { Iso6393 } from '../components/iso6393';
import './DataSetsTab.css'
import { useHistory } from 'react-router';

const handleMenuClick = (test: string) => {

  

  console.log("clicked" + test)

}

const Tab1: React.FC = () => {

  const history = useHistory()

  return (
    <IonPage>
      <IonReactRouter>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Datas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem onClick={() => {
              history.push("/tab1/iso6392")
            }}>
              <IonLabel>ISO 639 2 </IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("iso6393")}>
              <IonLabel>ISO 639 3 </IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("iso6395")}>
              <IonLabel>ISO 639 5 </IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("Iso6393Macrolanguages")}>
              <IonLabel>ISO 639 5 Macrolanguages</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("Iso6393Names")}>
              <IonLabel>ISO 639 5 Names</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("Iso6393Retirements")}>
              <IonLabel>ISO 639 5 Retirements</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("glottologFamily")}>
              <IonLabel>Glottolog Family</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("glottologLanguage")}>
              <IonLabel>Glottolog Language</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("gsecListingOfPeopleGroups")}>
              <IonLabel>GSEC Listing Of People Groups</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("gsecListingOfUnengagedUnreachedPeopleGroups")}>
              <IonLabel>GSEC Listing Of Unengaged Unreached People Groups</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("GSECListingOfUnreachedPeopleGroups")}>
              <IonLabel>GSEC Listing Of Unreached People Groups</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("GSECListingOfUUPG100k")}>
              <IonLabel>GSEC Listing Of UUPG 100k</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("GSECListingOfUUPG100kRemovals")}>
              <IonLabel>GSEC Listing Of UUPG 100k Removals</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("PeopleGroupsDataOnly")}>
              <IonLabel>People Groups Data Only</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("ProgressBibleLanguageDetails")}>
              <IonLabel>Progress Bible Language Details</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("RodAlternatenameindex")}>
              <IonLabel>Rod Alternatename Index</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("RodChangelist")}>
              <IonLabel>Rod Change List</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("RodDialects")}>
              <IonLabel>Rod Dialects</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("SilCountryCodes")}>
              <IonLabel>Sil Country Codes</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("SilLanguageCodes")}>
              <IonLabel>Sil Language Codes</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("SilLanguageIndex")}>
              <IonLabel>Sil Language Index</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfAdditionalLanguages")}>
              <IonLabel>Uf Additional Languages</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfCountriesList")}>
              <IonLabel>Uf Countries List</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLangnames")}>
              <IonLabel>Uf Lang Names</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguages")}>
              <IonLabel>Uf Languages</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithBiblePortions")}>
              <IonLabel>Uf Languages With Bible Portions</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithGospelRecording")}>
              <IonLabel>Uf Languages With Gospel Recording</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithJesusFilm")}>
              <IonLabel>Uf Languages With Jesus Film</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithOneStoryBibleStories")}>
              <IonLabel>Uf Languages With One Story Bible Stories</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithOpenBibleStories")}>
              <IonLabel>Uf Languages With Open Bible Stories</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfLanguagesWithRadioBroadcast")}>
              <IonLabel>Uf Languages With Radio Broadcast</IonLabel>
            </IonItem>
            <IonItem onClick={() => handleMenuClick("UfNetworks")}>
              <IonLabel>Uf Networks</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Data Sets</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen id="main-content">
      <Iso6393 />
        <h1>test</h1>
      </IonContent>
      <IonRouterOutlet>
          <Route path="/tab1/iso6392" render={() => <Iso6392 />} />
          <Route path="/tab1/iso6393" component={Iso6393} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonPage>
  );
};

export default Tab1;
