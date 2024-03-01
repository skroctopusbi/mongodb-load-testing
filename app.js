const axios = require('axios')
const https = require('https');
const data = JSON.stringify({
    "collection": "submissions",
    "database": "canvas",
    "dataSource": "dedicated-server",
    "filter": {
        "courseId": "345"
    }
});

const config = {
    method: 'post',
    url: 'https://us-west-2.aws.data.mongodb-api.com/app/data-xsbfm/endpoint/data/v1/action/find',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'UKx8KivxOtvdWd2qyfJP7AxTGo6ZHI78MXnH04MDm2QzxwIk9Gbzw9Wk1t08OihP',
    },
    data: data,
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
};

const fetchOne = async () => {
    try {
        const response = axios(config);
        console.log(response)
    } catch (error) {
       // console.log(error.data)
    }
    
}

const fetchmanyClients = async () => {

  console.time('API QueryTime')
    for(let i=0;i<1;i++){
        promises = []
        for(let i=0;i<1;i++){
            promises.push(fetchOne())
        }
        const responses = await Promise.all(promises).catch((e) => {
            console.log(e);
        });
        console.log(responses)
    }
   console.timeEnd('API QueryTime')
}

fetchmanyClients()