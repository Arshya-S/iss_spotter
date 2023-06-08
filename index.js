const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
// 24.66.139.158

// fetchCoordsByIp('42', (error, data) => {
//   console.log(error);
//   console.log(data);
// });

fetchISSFlyOverTimes({ latitude: '-5000', longitude: '-123.13000' }, (error,data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked: ' , data);
});