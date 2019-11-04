import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList, IonToggle, IonNote } from '@ionic/react';
import React from 'react';

import { ElectronService } from '../services/ElectronService';
import { AwsService } from '../services/AwsService';
import './Home.css';
import { ISave, IConfig } from '../index';

type HomeState = {
    secretAccessKey: string;
    accessKeyId: string;
    sessionToken: string;
    s3BucketUrl: string;
    saveDirectoryPath: string;
    list: ISave [];
    isSaved: boolean;
    region: string;
};
class Home extends React.Component<{}, HomeState> {
    electronService: ElectronService;
    awsService: AwsService;

    constructor(props: any) {
        super(props);
        this.electronService = new ElectronService();
        this.awsService = new AwsService('http://localhost');

        this.state = {
            secretAccessKey: '',
            accessKeyId: '',
            sessionToken: '',
            s3BucketUrl: '',
            list: [],
            saveDirectoryPath: '',
            isSaved: false,
            region: 'us-east-1'
        };
    }

    componentDidMount() {
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

    onUploadBtnClick() {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        delete stateClone.list;
        let config: IConfig = stateClone;
        this.electronService.uploadDirectory(config).then(() => {
            console.log('uploading not implemented'); // TESTING!!!
        });
    }

    onDownloadClick(key: string) {
        //TODO: download the key of the bucket item to the save location
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
                                        <IonInput readonly={this.state.isSaved} value={this.state.secretAccessKey} onIonChange={(e) => {this.onModelChange('secret', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.accessKeyId } onIonChange={(e) => {this.onModelChange('access', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">AWS Token</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.sessionToken} onIonChange={(e) => {this.onModelChange('token', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket URL</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.s3BucketUrl} onIonChange={(e) => {this.onModelChange('url', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
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
                    <IonFabButton onClick={(e) => {this.onUploadBtnClick()} }>+</IonFabButton>
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
