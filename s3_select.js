const S3 = require('aws-sdk/clients/s3');
const s3_client = new S3({
    region: 'us-east-1',
    sslEnabled: true,
});


exports.run_query = (params) => {
    return new Promise(function (resolve, reject) {

        s3_client.selectObjectContent(params, (err, data) => {
            if (err) {
                reject(err);
            }
            // data.Payload is a Readable Stream
            let record_count = 0;
            const eventStream = data.Payload;
            // Read events as they are available
            eventStream.on('data', (event) => {
                if (event.Records) {
                    record_count++;
                    // event.Records.Payload is a buffer containing
                    // a single record, partial records, or multiple records
                    //rows.push(event.Records.Payload.toString());
                    process.stdout.write(event.Records.Payload.toString());
                } else if (event.Stats) {
                    console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
                } else if (event.End) {
                    console.log('SelectObjectContent completed');
                }
            });

            // Handle errors encountered during the API call
            eventStream.on('error', (err) => {
                reject(err);
            });

            eventStream.on('end', () => {
                // Finished receiving events from S3
                resolve(record_count);
            });
        });
        
    });
}
