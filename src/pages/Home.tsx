import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList } from '@ionic/react';
import React from 'react';

import { ElectronServices } from '../services/ElectronServices';
import './Home.css';

const Home: React.FC = () => {


    let list = [
        {
            id: 1,
            title: 'AAA'
        },
        {
            id: 2,
            title: 'BBB'
        }
    ];

    let model: any = {
        secret: 'secret',
        access: 'access',
        token: 'token',
        url: 'url'
    };

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
                                        <IonInput value={model.secret} onIonChange={(e) => {onModelChange('secret', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput value={model.access} onIonChange={(e) => {onModelChange('access', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">AWS Token</IonLabel>
                                        <IonInput value={model.token} onIonChange={(e) => {onModelChange('token', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket URL</IonLabel>
                                        <IonInput value={model.url} onIonChange={(e) => {onModelChange('url', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
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
                    {list.map(item => (
                        <IonItem key={item.id}>
                            <IonLabel>{item.title}</IonLabel>
                            <IonButton slot="end" color="secondary">Download</IonButton>
                        </IonItem>
                    ))}

                </IonList>
            </IonContent>
        </IonPage>
    );

    function onModelChange(key: string, val: any) {
        console.log(key + ':' + val); // TESTING!!!
        model[key] = val;
    }

};

export default Home;
