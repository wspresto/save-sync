import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList } from '@ionic/react';
import React from 'react';

import './Home.css';

const Home: React.FC = () => {

    //TODO: inject ElectronServices 
    //getConfig();



    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Save Sync</IonCardTitle>
                        <IonCardSubtitle>Manage Game Save File Directories on an S3 Bucket.</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Secret Key</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">AWS Token</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket URL</IonLabel>
                                        <IonInput></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Save Directory</IonLabel>
                                        <IonInput></IonInput>

                                        <IonButton class="button-margin-fix" slot="end" color="secondary">Choose Directory</IonButton>
                                    </IonItem>
                                </IonCol>

                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

                <IonFab>
                    <IonFabButton >+</IonFabButton>
                </IonFab>

                <IonList>
                <IonItem>
                        <IonLabel>2019-10-22@12:23:34</IonLabel>
                        <IonButton slot="end" color="secondary">Download</IonButton>                        
                    </IonItem>
                    <IonItem>
                        <IonLabel>2019-10-22@15:23:34</IonLabel>
                        <IonButton slot="end" color="secondary">Download</IonButton>                        
                    </IonItem>                    
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Home;
