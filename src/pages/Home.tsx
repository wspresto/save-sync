import { IonContent, IonInput, IonItem, IonLabel, IonHeader, IonPage, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonRippleEffect, IonButton, IonList, IonToggle, IonNote, IonToast } from '@ionic/react';
import React from 'react';

import { ElectronService } from '../services/ElectronService';

import './Home.css';
import { IConfig, IBucketObject } from '../index';

type HomeState = {
    secretAccessKey: string;
    accessKeyId: string;
    s3BucketName: string;
    saveDirectoryPath: string;
    list: IBucketObject [];
    isSaved: boolean;
    region: string;
    toastMsg: string;
    showToast: boolean;
};
class Home extends React.Component<{}, HomeState> {
    electronService: ElectronService;


    get config(): IConfig {
        const copy: any = JSON.parse(JSON.stringify(this.state));
        delete copy.list;
        delete copy.isSaved;
        delete copy.showToast;
        delete copy.toastMsg;
        return copy;

    }

    constructor(props: any) {
        super(props);
        this.electronService = new ElectronService();

        this.state = {
            secretAccessKey: '',
            accessKeyId: '',
            s3BucketName: '',
            list: [],
            saveDirectoryPath: '',
            isSaved: true,
            region: 'us-east-1',
            showToast: false,
            toastMsg: 'Initialized.'
        };
    }

    componentDidMount() {
            this.electronService.getConfig().then((config: IConfig) => {
                if (!config) {
                    this.onModelChange('isSaved', false);
                    return;
                } else {
                    this.setState((state) => {
                        return Object.assign(state, config);
                    });
                    this.fetchBucketList();
                }
            });
    }
    fetchBucketList() {
        this.electronService.listBucket(this.config).then((data: any []) => {
            data.reverse();
            this.onModelChange('list', data);
        }, (err) => {
            console.error(err); // TESTING!!!
        });        
    }
    /**
     * returns true if value was different from existing value of model
     * @param key 
     * @param val 
     */
    onModelChange(key: string, val: any): boolean {
        let changes: any = {};
        const previous = changes[key];
        changes[key] = val;
        
        this.setState((state) => {
            return Object.assign(state, changes);
        });

        return previous != val;
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
        if (isChecked) {
            this.fetchBucketList();
            this.electronService.setConfig(this.config).then((success) => {
                if (success) {
                    this.showToast('Configuration Saved!');
                } else {
                    this.showToast('There was an Error...');
                }
            });
        }
    }

    onUploadBtnClick() {
        this.electronService.uploadDirectory(this.config).then((success: boolean) => {
            if (success) {
                this.fetchBucketList();
                this.showToast('Upload Complete!');
            } else {
                this.showToast('There was an Error...');
            }
        });
    }

    onDownloadClick(key: string) {
        this.electronService.downloadDirectory(this.config, key).then((success: boolean) => {
            if (success) {
                this.showToast('Download Complete!');
            } else {
                this.showToast('There was an Error...');
            }
        });
    }

    showToast(msg: string) {
        this.onModelChange('toastMsg', msg);
        this.onModelChange('showToast', true);

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
                        <IonToggle slot="end" color="primary" checked={this.state.isSaved} onIonChange={(e) => {this.onSavedToggle(e.detail.checked);}} />
                    </IonItem>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Secret Key</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.secretAccessKey} onIonChange={(e) => {this.onModelChange('secretAccessKey', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Access Key</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.accessKeyId } onIonChange={(e) => {this.onModelChange('accessKeyId', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">S3 Bucket Name</IonLabel>
                                        <IonInput readonly={this.state.isSaved} value={this.state.s3BucketName} onIonChange={(e) => {this.onModelChange('s3BucketName', e.detail ? e.detail.value : '')}} debounce={250}></IonInput>
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
                    <IonFabButton onClick={(e) => {this.onUploadBtnClick()} } >
                        <div className="save-icon"></div>
                    </IonFabButton>
                </IonFab>

                <h2>Synced Saves</h2>
                <p><em>Previously Synced Save directories will appear here.</em></p>
                <IonList className="list">
                    {this.state.list.map(item => (
                        <IonItem key={item.Key}>
                            <IonLabel>{item.Key}</IonLabel>
                            <IonButton onClick={(e) => {this.onDownloadClick(item.Key)}} slot="end" color="secondary">Download</IonButton>
                        </IonItem>

                    ))}
                </IonList>

                <IonToast
                    animated
                    position="bottom"
                    onDidDismiss={() => this.onModelChange('showToast', false)}
                    isOpen={this.state.showToast}
                    message={this.state.toastMsg}
                    duration={5000}
                />
            </IonContent>
        </IonPage>
        );
    }
       
};

export default Home;
