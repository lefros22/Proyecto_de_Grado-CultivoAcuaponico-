#  Scripts and files of the management system

Here you can find all the scripts used for the automation system in the management system component,
also you can check in the last README the explanation of all files here.


## Mount a space in ram
Replace "full_path" with the exact path where you want the ram folder, not including the "[]", also you can change the size in size, actual size is 30mb in the command
### `sudo mount -t tmpfs -o rw,size=30m tmpfs [full_path]` 
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
