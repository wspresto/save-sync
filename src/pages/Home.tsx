import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

declare global {
    interface Window {
      require: any;
    }
  }
  
  const electron = window.require('electron');

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Save Sync v1.0.0</h1>
                <button onClick={() => electron.ipcRenderer.send('main', {msg: 'opo says hi'})}>Send Ping</button>
            </IonContent>
        </IonPage>
    );
};

export default Home;
