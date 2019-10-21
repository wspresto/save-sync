import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Home: React.FC = () => {
    let getConfig = () => {
        let config = ipcRenderer.sendSync('config.get');
        console.log(config); // TESTING!!!
    };

    let getFiles = () => {
        ipcRenderer.send('files.get');
    };

    getConfig();



    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Save Sync v1.0.0</h1>
                <button onClick={getFiles}>Upload Files</button>





            </IonContent>
        </IonPage>
    );
};

export default Home;
