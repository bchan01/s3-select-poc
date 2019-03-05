const s3_select = require('./s3_select');

const params = {
    Bucket: 'XYZ',
    Key: 'change-notice-police-department-incidents.csv',
    ExpressionType: 'SQL',
    Expression: "SELECT * FROM s3object s WHERE s.Category = 'ASSAULT' and s.PdDistrict = 'MISSION' and s.\"Date\" BETWEEN '2004-12-31' AND '2005-01-01'",
    InputSerialization: {
        CSV: {
            FileHeaderInfo: 'USE',
            RecordDelimiter: '\n',
            FieldDelimiter: ','
        }
    },
    OutputSerialization: {
        //CSV: {}
        'JSON': {}

    }
};


s3_select.run_query(params).then(results => {
    console.log("S3 SELECT SUCCESS");
    console.log(JSON.stringify(results));
}).catch(error => {
    console.error("S3 SELECT ERROR", error);
})