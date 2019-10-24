export class AwsService {
    s3BucketUrl: string;
    constructor(s3BucketUrl: string) {
        this.s3BucketUrl = s3BucketUrl;
    }

    getSaves(): Promise<any []> {
        return Promise.resolve([
            {
                id: 1,
                title: 'AAA'
            },
            {
                id: 2,
                title: 'BBB'
            }
        ])
    }
}