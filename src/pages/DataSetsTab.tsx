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

import { Iso6393 } from '../components/iso6393';
import { GlottologFamily } from '../components/GlottologFamily';
import { GlottologLanguage } from '../components/GlottologLanguage';
import { GSECListingOfPeopleGroups } from '../components/GSECListingOfPeopleGroups'
import { GSECListingOfUnengagedUnreachedPeopleGroups } from '../components/GSECListingOfUnengagedUnreachedPeopleGroups';
import { GSECListingOfUnreachedPeopleGroups } from '../components/GSECListingOfUnreachedPeopleGroups';
import { GSECListingOfUUPG100k } from '../components/GSECListingOfUUPG100k';
import { GSECListingOfUUPG100kRemovals } from '../components/GSECListingOfUUPG100kRemovals';
import { Iso6393Macrolanguages } from '../components/Iso6393Macrolanguages';
import { Iso6393Names } from '../components/Iso6393Names';
import { Iso6393Retirements } from '../components/Iso6393Retirements';
import { Iso6395 } from '../components/Iso6395';
import { PeopleGroupsDataOnly } from '../components/PeopleGroupsDataOnly';
import { ProgressBibleLanguageDetails } from '../components/ProgressBibleLanguageDetails';
import { RodAlternatenameindex } from '../components/RodAlternatenameindex';
import { RodChangelist } from '../components/RodChangelist';
import { RodDialects } from '../components/RodDialects';
import { SilCountryCodes } from '../components/SilCountryCodes';
import { SilLanguageCodes } from '../components/SilLanguageCodes';
import { SilLanguageIndex } from '../components/SilLanguageIndex';
import { UfAdditionalLanguages } from '../components/UfAdditionalLanguages';
import { UfCountriesList } from '../components/UfCountriesList';
import { UfLangnames } from '../components/UfLangnames';
import { UfLanguages } from '../components/UfLanguages';
import { UfLanguagesWithBiblePortions } from '../components/UfLanguagesWithBiblePortions';
import { UfLanguagesWithGospelRecording } from '../components/UfLanguagesWithGospelRecording';
import { UfLanguagesWithJesusFilm } from '../components/UfLanguagesWithJesusFilm';
import { UfLanguagesWithOneStoryBibleStories } from '../components/UfLanguagesWithOneStoryBibleStories';
import { UfLanguagesWithOpenBibleStories } from '../components/UfLanguagesWithOpenBibleStories';
import { UfLanguagesWithRadioBroadcast } from '../components/UfLanguagesWithRadioBroadcast';
import { UfNetworks } from '../components/UfNetworks';
import './DataSetsTab.css'

const Tab1: React.FC = () => {

  return (
    <IonPage>
      <IonReactRouter>
      <IonMenu contentId="main-content">
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
          <IonTitle>Data Sets</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen id="main-content" scrollY={true}>
        <IonRouterOutlet>
          <Route path="/tab1/iso-639-3" render={() => <Iso6393 />} />
          <Route path="/tab1/glottolog-family" render={() => <GlottologFamily />} />
          <Route path="/tab1/glottolog-language" render={() => <GlottologLanguage />} />
          <Route path="/tab1/gsec-listing-of-people-groups" render={() => <GSECListingOfPeopleGroups />} />
          <Route path="/tab1/gsec-listing-of-unengaged-unreached-people-groups" render={() => <GSECListingOfUnengagedUnreachedPeopleGroups />} />
          <Route path="/tab1/gsec-listing-of-unreached-people-groups" render={() => <GSECListingOfUnreachedPeopleGroups />} />
          <Route path="/tab1/gsec-listing-of-uupg-100k" render={() => <GSECListingOfUUPG100k />} />
          <Route path="/tab1/gsec-listing-of-uupg-100k-removals" render={() => <GSECListingOfUUPG100kRemovals />} />
          <Route path="/tab1/iso-639-3-macrolanguages" render={() => <Iso6393Macrolanguages />} />
          <Route path="/tab1/iso-639-3-names" render={() => <Iso6393Names />} />
          <Route path="/tab1/iso-639-3-retirements" render={() => <Iso6393Retirements />} />
          <Route path="/tab1/iso-639-5" render={() => <Iso6395 />} />
          <Route path="/tab1/people-groups-data-only" render={() => <PeopleGroupsDataOnly />} />
          <Route path="/tab1/progress-bible-language-details" render={() => <ProgressBibleLanguageDetails />} />
          <Route path="/tab1/rod-alternatenameindex" render={() => <RodAlternatenameindex />} />
          <Route path="/tab1/rod-changelist" render={() => <RodChangelist />} />
          <Route path="/tab1/rod-dialects" render={() => <RodDialects />} />
          <Route path="/tab1/sil-country-codes" render={() => <SilCountryCodes />} />
          <Route path="/tab1/sil-language-codes" render={() => <SilLanguageCodes />} />
          <Route path="/tab1/sil-language-index" render={() => <SilLanguageIndex />} />
          <Route path="/tab1/uf-additional-languages" render={() => <UfAdditionalLanguages />} />
          <Route path="/tab1/uf-countries-list" render={() => <UfCountriesList />} />
          <Route path="/tab1/uf-langnames" render={() => <UfLangnames />} />
          <Route path="/tab1/uf-languages" render={() => <UfLanguages />} />
          <Route path="/tab1/uf-languages-with-bible-portions" render={() => <UfLanguagesWithBiblePortions />} />
          <Route path="/tab1/uf-languages-with-gospel-recording" render={() => <UfLanguagesWithGospelRecording />} />
          <Route path="/tab1/uf-languages-with-jesus-film" render={() => <UfLanguagesWithJesusFilm />} />
          <Route path="/tab1/uf-languages-with-one-story-bible-stories" render={() => <UfLanguagesWithOneStoryBibleStories />} />
          <Route path="/tab1/uf-languages-with-open-bible-stories" render={() => <UfLanguagesWithOpenBibleStories />} />
          <Route path="/tab1/uf-languages-with-radio-broadcast" render={() => <UfLanguagesWithRadioBroadcast />} />
          <Route path="/tab1/uf-networks" render={() => <UfNetworks />} />
          <Route exact path="/tab1">
            <Redirect to="/tab1/iso-639-2" />
          </Route>
        </IonRouterOutlet>
      </IonContent>
      
      </IonReactRouter>
    </IonPage>
  );
};

export default Tab1;
