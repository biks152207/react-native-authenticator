# React social/local authenticator

This package is a solid react authenticator which generates authentication on both android and ios with same code base
### Installation
```sh
$ cd mobile
$ npm install
$ react-native run-ios
$ react-native run-android
$ cd server
$ npm install
$ npm start
```
# Rules!

  - Add your facebook application client id and client secret
  - Add your mongodb connection string
  - Add your api endpoint (we allow our server endpoint only which is http://localhost:3000) so through configuration process our package will ask the endpoint just to check our server up and running which is inside server folder
  - Afer configuration we suggest you to compile the app again with ```` $ react-native run-ios ```` or ```react-native run-android ```

**Free Software, Hell Yeah!**
