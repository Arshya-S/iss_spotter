const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIp = (ip,callback) => {
  request('http://ipwho.is/' + ip, (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
    
    let parsedBody = JSON.parse(body);
    
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    let coords = {};
    coords['latitude'] = JSON.parse(body).latitude;
    coords['longitude'] =  JSON.parse(body).longitude;
    callback(null, coords);
  });
};


const fetchISSFlyOverTimes = (coords, callback)  => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).response;
    callback(null,data);
  });
};


const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error,ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIp(ip, (error,coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error,data) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, data);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };

