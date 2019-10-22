import { IonContent, IonInput, IonIcon, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton } from '@ionic/react';
import React from 'react';



const Home: React.FC = () => {

    //TODO: inject ElectronServices 
    //getConfig();



    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Save Sync</h1>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>AWS Credentials</IonCardTitle>
                        <IonCardSubtitle>This information is needed to save and download save files from the server.</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <h4>Secret Key</h4>
                        <IonInput placeholder="Enter Value"></IonInput>
                        <h4>Access Key</h4>
                        <IonInput placeholder="Enter Value"></IonInput>
                        <h4>AWS Token</h4>
                        <IonInput placeholder="Enter Value"></IonInput>
                        <h4>S3 Bucket URL</h4>
                        <IonInput placeholder="Enter Value"></IonInput>


                    </IonCardContent>
                </IonCard>



                <IonFab>
                            <IonFabButton >+</IonFabButton>
                        </IonFab>


            </IonContent>
        </IonPage>
    );
};

export default Home;
