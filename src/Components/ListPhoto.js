import React, { Component } from "react";
import awsconfig from './../aws-exports';
import AllPhotos from "./AllPhotos";
import AddPhoto from "./AddPhoto";

const S3_BUCKET_REGION = awsconfig.aws_user_files_s3_bucket_region
const S3_BUCKET_NAME = awsconfig.aws_user_files_s3_bucket

export class ListPhoto extends Component{
    render() {
        return (
            <div>
                 <AddPhoto options={{ bucket: S3_BUCKET_NAME, region: S3_BUCKET_REGION }} />
                <AllPhotos />        
            </div>
        )
    }
}