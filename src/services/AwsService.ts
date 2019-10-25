import { ISave } from '../index';
export class AwsService {
    s3BucketUrl: string;
    constructor(s3BucketUrl: string) {
        this.s3BucketUrl = s3BucketUrl;
    }

    getSaves(): Promise<ISave []> {
        //TODO: get saves from aws
        return Promise.resolve([
            {
                id: 1,
                title: 'AAA'
            },
            {
                id: 2,
                title: 'BBB'
            }
        ]);
    }

    uploadSave(dirPath: string, save: ISave): Promise<ISave> {
        //TODO: upload to aws
        return Promise.resolve({} as any);
    }
}