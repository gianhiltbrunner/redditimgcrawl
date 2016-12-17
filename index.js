const request = require('request')
     ,url = 'https://www.reddit.com/r/earthporn/top/.json?limit=1?t=all'
const fs = require('fs');
const download = require('download');

request(url, (error, response, body)=> {
 if (!error && response.statusCode === 200) {
   const json = JSON.parse(body)

   var count = 0;
   json.data.children.forEach(function(element) {//Go trough all children
     //Get image url of these children
     count++;
     getImage(element.data.url, count);//dl the images
   });
 }
 else {
   console.log("Got an error: ", error, ", status code: ", response.statusCode)
 }
})

function getImage(url,count) {
  download(url).then(data => {
      fs.writeFileSync('data/image'+ count +'.'+ url.split(/[. ]+/).pop(), data);
  });
}
