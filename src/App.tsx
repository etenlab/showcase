import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
// import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from "ionicons/icons";

import Tab1 from "./pages/DataSetsTab";
import Tab2 from "./pages/UtilityTab";
import Tab3 from "./pages/UserTab";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import { Discussion } from './components/discussion';
import { DiscussionPage } from "./components/Discussion2";
import { FileUploadPage } from "./components/fileUpload";

// import UserPage from './pages/UserPage';
import ProtectedPage from "./pages/ProtectedPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./styles.css";

import { PrivateRoute } from "./utils/PrivateRoute";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Router>
      <IonTabs>
        <IonRouterOutlet id="app-tabs">
          <Route path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route
            path="/discussion/:table_name/:row"
            component={DiscussionPage}
          />
          {/* <Route path="/discussion/:table_name/:row" component={Discussion} /> */}
          <Route path="/file-upload" component={FileUploadPage} />
          <PrivateRoute
            roles={["showcase-user"]}
            path="/protected"
            component={ProtectedPage}
          />
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Data Sets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Utility</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>User</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </Router>
  </IonApp>
);

export default App;
