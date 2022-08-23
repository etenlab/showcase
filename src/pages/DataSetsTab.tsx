import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import { Iso6392 } from '../components/iso6392';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data Sets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Iso6392 />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
