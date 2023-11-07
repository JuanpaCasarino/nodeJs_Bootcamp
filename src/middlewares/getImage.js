import https from 'https'

const getUrlImageBuffer = (imageUrl) => {
    return new Promise((resolve) => {
      https.get(imageUrl, (imageResponse) => {
        if (imageResponse.statusCode !== 200) {
          reject('no image');
          return;
        }
  
        let imageChunks = [];
        imageResponse.on('data', (chunk) => {
          imageChunks.push(chunk);
        });
        imageResponse.on('end', () => {
          const imageBuffer = Buffer.concat(imageChunks);
          resolve(imageBuffer);        
        });
      }).on('error', (error) => {
        reject(error);      
      });
    })
  }

  export {getUrlImageBuffer}