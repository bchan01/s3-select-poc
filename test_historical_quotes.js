const s3_select = require('./s3_select');

const params = {
    Bucket: 'XYZ',
    Key: 'GOOG.csv',
    ExpressionType: 'SQL',
    Expression: "SELECT * FROM s3object s where s.\"Date\" BETWEEN '2019-01-31' AND '2019-03-01'",
    InputSerialization: {
        CSV: {
            FileHeaderInfo: 'USE',
            RecordDelimiter: '\n',
            FieldDelimiter: ','
        }
    },
    OutputSerialization: {
        CSV: {}
        //'JSON': {}

    }
};


s3_select.run_query(params).then(results => {
    console.log("S3 SELECT SUCCESS");
    console.log(JSON.stringify(results));
}).catch(error => {
    console.error("S3 SELECT ERROR", error);
})