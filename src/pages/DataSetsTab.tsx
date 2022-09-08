import { IonAccordion, IonAccordionGroup, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Iso6392 } from '../components/iso6392';
import { CommentCount, DiscussionEmbed } from 'disqus-react';
import './DataSetsTab.css'
import { useRef } from 'react';

const Tab1: React.FC = () => {

  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  const toggleAccordion = () => {
    if (!accordionGroup.current) {
      return;
    }
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === 'dis-1') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'dis-1';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data Sets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Iso6392 />

        <IonButton onClick={toggleAccordion}>
          <CommentCount
            shortname='dev-etenlab-com'
            config={
              {
                url: 'https://dev-showcase.etenlab.com',
                identifier: 'home-1',
                title: 'Home Page Discussion',
              }
            }
          >
            {/* Placeholder Text */}
            Comments
          </CommentCount>
        </IonButton>

        <IonAccordionGroup ref={accordionGroup}>
          <IonAccordion value='dis-1'>
            <div className='disqus-wrap' slot="content">
              <DiscussionEmbed
                shortname='dev-etenlab-com'
                config={
                  {
                    url: 'https://dev-showcase.etenlab.com',
                    identifier: 'home-1',
                    title: 'Home Page Discussion',
                  }
                }
              />
            </div>
          </IonAccordion>
        </IonAccordionGroup>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
