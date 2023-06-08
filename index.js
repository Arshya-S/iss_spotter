const { fetchMyIP, fetchCoordsByIp } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
// 24.66.139.158

fetchCoordsByIp('42', (error, data) => {
  console.log(error);
  console.log(data);
});