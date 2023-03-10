#Here you can find all the scripts used for the automation system in the management system component

## Mount in ram

## firebase credentials
This project use a realtime firebase to save all data, in some scripts you can see the next code-line:

### `config = json.loads(sp.getoutput('cat firebase-credentials.json'))`

that command loads the project credentials in firebase, if you want make with yours

- first: create a file named "firebase-credentials.json"
- second: look in the firebase project and put in the above file the credentials in json format:
  ```
  {
  "apiKey": "----------",
  "authDomain": "----------",
  "databaseURL": "https://------------",
  "storageBucket": "---------------------"
  }
  ```
