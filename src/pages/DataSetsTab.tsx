import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import { Iso6392 } from '../components/iso6392';
import { DiscussionEmbed } from 'disqus-react';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data Sets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DiscussionEmbed
          shortname='example'
          config={
            {
              url: 'dev.etenlab.com',
              identifier: 'home-1',
              title: 'Home Page Discussion',
              language: 'en_US' 
            }
          }
        />
        <Iso6392 />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
