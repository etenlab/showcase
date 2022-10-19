import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import AppList from "../components/AppList";
import LanguageProficiency from "../components/LanguageProficiency";
import SiteText from "../components/SiteText";
import SiteTextTranslation from "../components/SiteTextTranslation";

const Tab4: React.FC = () => {
    return (
        <IonPage>
            <IonReactRouter>
                <IonMenu contentId="showcase-content">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Showcase</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonList>
                            <IonItem href="/tab4/app-list">
                                <IonLabel>App List</IonLabel>
                            </IonItem>
                            <IonItem href="/tab4/site-text">
                                <IonLabel>Site Text</IonLabel>
                            </IonItem>
                            <IonItem href="/tab4/site-text-translation">
                                <IonLabel>Site Text Translation</IonLabel>
                            </IonItem>
                            <IonItem href="/tab4/language-proficiency">
                                <IonLabel>Language Proficiency</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonMenu>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Showcase</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen id="showcase-content" scrollY={true}>
                    <IonRouterOutlet>
                        <Route
                            path="/tab4/app-list"
                            render={() => <AppList />}
                        />
                        <Route
                            path="/tab4/site-text"
                            render={() => <SiteText />}
                        />
                        <Route
                            path="/tab4/site-text-translation/:app_id?/:site_text_id?"
                            render={() => <SiteTextTranslation />}
                        />
                        <Route
                            path="/tab4/language-proficiency"
                            render={() => <LanguageProficiency />}
                        />
                    </IonRouterOutlet>
                </IonContent>
            </IonReactRouter>
        </IonPage>
    );
};

export default Tab4;
