import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList, IonToggle, IonNote } from '@ionic/react';
import React from 'react';

import { ElectronService } from '../services/ElectronService';
import { AwsService } from '../services/AwsService';
import './Home.css';
import { ISave, IConfig } from '../index';

type HomeState = {
    secret: string;
    access: string;
    token: string;
    url: string;
    saveDirectoryPath: string;
    list: ISave [];
    isSaved: boolean;
};
class Home extends React.Component<{}, HomeState> {
    electronService: ElectronService;
    awsService: AwsService;

    constructor(props: any) {
        super(props);
        this.electronService = new ElectronService();
        this.awsService = new AwsService('http://localhost');

        this.state = {
            secret: '',
            access: '',
            token: '',
            url: '',
            list: [],
            saveDirectoryPath: '',
            isSaved: false
        };
    }

    componentDidMount() {

            //awsService.getSaves().then((saves: any []) => {
                //this.onModelChange('list', saves);
            //});
            this.electronService.getConfig().then((config: IConfig) => {
                console.log(config); // TESTING!!!
                if (!config) {
                    return;
                }
                this.setState((state) => {
                    return Object.assign(state, config);
                });
            });


    }

    onModelChange(key: string, val: any) {
        let changes: any = {};
        changes[key] = val;
        this.setState((state) => {
            return Object.assign(state, changes);
        });
    }

    onSetSaveDirectory(e: any) {
        if (this.electronService.isNative) {
            this.electronService.getDirectory().then((e: any) => {
                const dirs = e.filePaths
                if (dirs.length > 0) {
                    this.onModelChange('saveDirectoryPath', dirs[0]);
                }
            });
        } else {
            console.error('You are not running electron services.');
        }

    }

    onSavedToggle(isChecked: boolean) {
        this.onModelChange('isSaved', isChecked);
        let stateClone = JSON.parse(JSON.stringify(this.state));
        delete stateClone.list;
        let config: IConfig = stateClone;
        if (isChecked) {
            this.electronService.setConfig(config);
        }
    }

    render () {
        return (
            <IonPage>
            <IonContent className="ion-padding">
                <IonCard>
  
                    <IonCardHeader>
                        <IonCardTitle>Save Sync</IonCardTitle>
                        <IonCardSubtitle>
                            Manage Game Save File Directories on an S3 Bucket.
         
                        </IonCardSubtitle>
                        <IonItem>
                        <IonNote slot="end">{this.state.isSaved ? 'All Changes Saved' : 'Click to Save Changes'}</IonNote>
                        <IonToggle slot="end" color="primary" checked={this.state.isSaved} onIonChange={(e) => {this.onSavedToggle(e.detail.checked)}} />
                    </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Secret Key</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.secret} onIonChange={(e) => {this.onModelChange('secret', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.access } onIonChange={(e) => {this.onModelChange('access', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">AWS Token</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.token} onIonChange={(e) => {this.onModelChange('token', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket URL</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.url} onIonChange={(e) => {this.onModelChange('url', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Save Directory</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.saveDirectoryPath} onIonChange={(e) => {this.onModelChange('saveDirectoryPath', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>

                                        <IonButton disabled={this.state.isSaved} class="button-margin-fix" slot="end" color="secondary" onClick={this.onSetSaveDirectory.bind(this)}>Choose Directory</IonButton>
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
