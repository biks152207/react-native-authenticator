const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const config = require('../config/index.json');
const Q = require('q');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var request = Promise.promisify(require("request"));
Promise.promisifyAll(request);
var accessToken;
var configPath;

var  fileGenerator = function(configPath, data, encoding){
  var defer = Q.defer();
  fs.writeFile(configPath, data, encoding, function(err){
    if (err) return defer.reject(err);
    defer.resolve('success');
  })
  return defer.promise;
}

var plistGenerator = function(configPath, id, displayName, platform){

  return fs.readFileAsync(configPath, 'utf8')
    .then(function(xml) {
      if (platform === 'ios'){
        // Replaces the previous facebook xml;
        const facebookNewConfig = `CFBundleURLSchemes</key>
        <array>
        <string>fb${id.trim()}</string>
        </array>
        </dict>
        </array>
        <key>FacebookAppID</key>
        <string>${id.trim()}</string>
        <key>FacebookDisplayName</key>
        <string>${displayName.trim()}</string>
        <key>`;
        xml = xml.slice(0, xml.indexOf('CFBundleURLSchemes')) + facebookNewConfig + xml.slice(xml.indexOf('LSApplicationQueriesSchemes'), xml.length + 1);

      }else{
        xml = `<resources>
            <string name="app_name">${displayName.trim()}</string>
            <string name="facebook_app_id">${id.trim()}</string>
        </resources>`
      }
      fs.writeFile(configPath, xml);
    });
};

var apiUrlGenerator = function(configPath, apiUrl) {
  let client_config_filestream = fs.createReadStream(configPath, { 'encoding': 'utf8' }),
      chunks = [];
  client_config_filestream.on('data', (chunk) => {
    chunks.push(chunk);
  });

  client_config_filestream.on('end', () => {
    let newConfigAPIURL = chunks.join().replace(/(http|https)?:\/\/?([\da-z\.-]+)\.?([\da-z\.]{2,6})([\/\w \.-]*)*\/?:[\d]{0,4}\/?/ig, apiUrl);
    fileGenerator(configPath, newConfigAPIURL, 'utf8');
  });
};


exports.config = function(req, res){
  let proc  = [];
  let facebook_client_id = req.body.FacebookAppID,
      facebook_client_secret = req.body.FacebookClientSecret,
      facebook_display_name = req.body.FacebookDisplayName,
      mongodb_url = req.body.MongodbURL,
      api_url = req.body.APIURL;

  if(mongodb_url && facebook_client_id && facebook_client_secret) {
    configPath = path.normalize(__dirname + '/../config/index.json');
    var json = JSON.stringify(_.extend(config, { db: mongodb_url.toLowerCase(), facebook: { client_id:facebook_client_id, client_secret:facebook_client_secret, callback_url: "http://localhost:3000/auth/facebook/callback"} }));
    proc.push(fileGenerator(configPath, json, 'utf8'));
  }

  if(facebook_client_id && facebook_display_name) {
    let settingPath  = req.body.Platform === 'ios' ? '/../../mobile/ios/mobile/Info.plist':  '/../../mobile/android/app/src/main/res/values/strings.xml';
    configPath = path.normalize(__dirname + settingPath);
    proc.push(plistGenerator(configPath, facebook_client_id, facebook_display_name, req.body.Platform));
  }

  if(api_url) {
    api_url += ((api_url.substring(api_url.length - 1, api_url.length)) === '/' ? '' : '/');
    configPath = path.normalize(__dirname + '/../../mobile/src/app/common/enums.js');
    proc.push(apiUrlGenerator(configPath, api_url));
  }

  Q.all(proc)
  .then((response) => {
    res.json({message: 'success'});
  })
  .catch(function(err) {

  });
}

async function getAppInfo(appId, accessToken){
  const info = await graphApiRequest(`${config.graph}/${appId}?access_token=${accessToken}`);
  var { body } = info;
  return body;
}

async function graphApiRequest(url){
  return request({
    uri: url,
    method: "GET"
  })
}

async function getAccessToken(client_id, client_secret) {
  const response = await graphApiRequest(`${config.graph}/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`)
  const { body } = response;
  accessToken = body.split('=')[1];
  return accessToken;
}

exports.graph = function(req, res) {
  let client_id = req.body.FacebookAppID,
      client_secret = req.body.FacebookClientSecret;
  if (client_id && client_secret) {
      getAccessToken(client_id, client_secret)
      .then((response)=>{
        const accessToken = response;
        getAppInfo(req.body.FacebookAppID,accessToken)
          .then((response)=>{
            var info = JSON.parse(response);
            if (info.error)  return res.status(409).json(info);
            return res.json(info);
          });
      });
  }
}
