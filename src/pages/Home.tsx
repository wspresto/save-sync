import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Home: React.FC = () => {
    let getConfig = () => {
        let config = ipcRenderer.sendSync('config.get');
        console.log(config); // TESTING!!!
    }

    getConfig();

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Save Sync v1.0.0</h1>
                {/*-- Default Input --*/}
                <IonInput></IonInput>

                {/*-- Input with value --*/}
                <IonInput value="custom"></IonInput>

                {/*-- Input with placeholder --*/}
                <IonInput placeholder="Enter Input"></IonInput>

                {/*-- Input with clear button when there is a value --*/}
                <IonInput clearInput value="clear me"></IonInput>
            </IonContent>
        </IonPage>
    );
};

export default Home;
