const core=require('@actions/core');
// const github=require('@actions/github');
const exec=require('@actions/exec');
function run(){
    // get input value
    const bucket=core.getInput('bucket',{ required: true });
    const bucketRegion=core.getInput('bucket-region',{ required: true });
    const distFolder=core.getInput('dist-folder',{ required: true });

    // 2) upload files to s3
    exec.exec(`aws s3 sync ${distFolder} s3://${bucket} --delete --region ${bucketRegion}`);
    const websiteUrl=`http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url',websiteUrl);
}

run();