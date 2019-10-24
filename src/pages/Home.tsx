import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList } from '@ionic/react';
import React from 'react';

import { ElectronServices } from '../services/ElectronService';
import { AwsService } from '../services/AwsService';
 import './Home.css';
import { tsConstructorType } from '@babel/types';

type AwsBucketItem = {
    id: number;
    title: string;
}
type HomeState = {
    secret: string;
    access: string;
    token: string;
    url: string;
    list: AwsBucketItem [];
};
class Home extends React.Component<{}, HomeState> {

    constructor(props: any) {
        super(props);

        this.state = {
            secret: 'secret',
            access: 'access',
            token: 'token',
            url: 'url',
            list: []
        };

    }

    componentDidMount() {
        let awsService = new AwsService('');
        awsService.getSaves().then((saves: any []) => {
            this.onModelChange('list', saves);
        });
    }

    onModelChange(key: string, val: any) {
        // console.log(key + ':' + val); // TESTING!!!
        let changes: any = {};
        changes[key] = val;
        this.setState((state) => {
            return Object.assign(state, changes);
        });
    }

    render () {
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
                                        <IonInput value={this.state.secret} onIonChange={(e) => {this.onModelChange('secret', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput value={this.state.access } onIonChange={(e) => {this.onModelChange('access', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">AWS Token</IonLabel>
                                        <IonInput value={this.state.token} onIonChange={(e) => {this.onModelChange('token', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket URL</IonLabel>
                                        <IonInput value={this.state.url} onIonChange={(e) => {this.onModelChange('url', e.detail ? e.detail.value : '')}} debounce={2000}></IonInput>
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
                    {this.state.list.map(item => (
                        <IonItem key={item.id}>
                            <IonLabel>{item.title}</IonLabel>
                            <IonButton slot="end" color="secondary">Download</IonButton>
                        </IonItem>
                    ))}

                </IonList>
            </IonContent>
        </IonPage>
        );
    }
       




};

export default Home;
