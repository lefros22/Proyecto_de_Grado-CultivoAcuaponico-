# Management system

This folder contains the source code of the management system and the services files

## Folders: 

- **servicios:** the source code of program

- **services systemd:** the configuration archives to sytemd

- **service crontab:** the linux command for services in crontab

## Explanation of each of solution

### services executed with crontab
- Webcam: takes twenty photos, one photo every three seconds, and stores it in ram (Managed by crontab, runs it every minute).
- AskInternet: pings google and if successful, stores in ram(statusInternet) the value 'ON' that represents internet connectivity.

### python services executed with systemd
#### BD reading:
- **EstadoControl_service:** it is a listener of the control state in which the DB is found in the location "Control/stateControl" corresponding to the state of the control (Manual, Automatic, Emergency) and writes it to a ram file located in "Ram_Var/estado.txt”.
- **EstadoActuadores_service:** it is a listener of the actuators state that is found in "Control/Actuators" and when a change occurs, it writes it to a ram file "Ram_Var/actuadores.txt".
#### DB writing:
- **ActPinesBD_service:** subscribes to the "main/actuadores" topic, manages a JSON that contains the status that each actuator must have and when it receives a message, it updates (set) the status that was sent to it in the DB in the "Control/Actuadores" location .
- **SensoresBD_service:** It subscribes to the “esp32/sensor” topic, it manages a JSON that contains the measurement of the esp32 sensors and when it receives a message, it adds (push) the status that was sent to it in BD in the “DatosSensoresInterno” location.
- **MensajesBD_service:** is subscribed to the topic “main/mensajes” and when it receives a message, it sends it (push) to BD in the location “Mensajes”.
- **SensoresExtBD:** is subscribed to the topic “Main/sensorExr/#“ and when it receives a measurement result, it sends it (push) to BD in the location “DatosSensoresExterno”.
- **PredictionsBD_service:** is subscribed to the “PredictionsBD” topic and when it receives a result from the work cycles, it sends (push) them to BD in the “ControlPredictivoResult” location.
#### Publishers in mqtt
- **Desague_service:** reads the status of a GPIO port of the raspberry (drain sensor found in the drainage module of the physical assembly) and publishes an emergency message in the "main/messages" topic if activated.
- **LightSensor_service:** reads the result of an I2C luminosity sensor every minute and publishes the average of the measurement every two hours in the topic “Main/sensorExr/Ligth”.
- **ControlModerno:** it is a service of the execution type with a timer which is executed automatically every two hours and makes the prediction of the best combination of stimuli for the next interval, which writes in Ram ("Ram_Var/ciclos_pred.txt") and sends a message to the topic “PredictionsBD”.

#### Main
- **MainControl:** is the main service that reads variables stored in RAM and publishes to MQTT using commands with the subsystem library. It manages the ignition of the actuators depending on the time of day and also manages the measurement and dosage of feed. This service implements two threads, one for water circulation and the other for sensing. Additionally, depending on the internet connectivity, it activates the ON/OFF control as an emergency system, since the predictive needs information from the internet.
#### Others
- **PinesActuators:** it subscribes to the "main/actuatuadores" topic, it manages a JSON that contains the status that each actuator must have and when it receives a message, it updates the status that was sent to it in the GPIO ports.

### Python scripts:
- **Control_module:** contains two functions
  - *Porcentajes:* returns what status the different actuators should have depending on the time of day according to a predefined Json file.
  - *get_Porcentajes_predictivo:* returns the working percentages for the actuators according to the current state of the predictive control.

- **PictureBD:** Reads an image from the BD every three seconds, converts it to base64, and sends it to the BD.

- **RN:** script that loads the models (ML model, scaler dimensional model, standard scaler) and contains a function that executes the prediction by going through the three models.
- **FUZZY:** script that generates the value that should be applied according to the previous luminosity average.

### Files:
#### Models:
- **RNmodel:** model corresponding to the neural network (sklearn MLPregressor).
- **dim_scaler:** dimensional reduction model (sklearn PCA decomposition).
- **std_scaler:** normalization model (sklearn StandardScaler).

#### Variables in ram:
- **actuadores:** JSON file with the status of each actuator in the database.
- **status:** control status value (manual, automatic, emergency) found in the database.
- **last1Lum_sensor:** The last average luminosity measured.
- **last6_sensor:** JSON file with the record of the last 6 values measured in the fish tank.
- **ciclos_pred:** JSON file corresponding to the work percentages calculated by the predictive control.
- **Captura.jpg:** image corresponding to the photo captured by the camera
- **statusInternet:** value corresponding to the internet status

## ADDITIONAL
### Libraries used in this project

#### For Raspberry:

- Mosquitto-broker: used to set the raspberry pi as a bróker mqtt 
  - https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/

- Mosquitto-client: used to set the raspberry pi as a client mqtt
  - https://randomnerdtutorials.com/testing-mosquitto-broker-and-client-on-raspbbery-pi/

- fswebcam: used to take photos from usb camera in webcam.sh

#### For python:

- paho.mqtt.client: used for suscribe and create a client in python script
- pyrebase: used for make the conection to bd firebase-realtime
  - https://github.com/thisbejim/Pyrebase
- pip install DateTime
- rpi.gpio: used to control the gpios of the raspberry and control the elements of action.
  - https://www.raspberrypi-spy.co.uk/2012/05/install-rpi-gpio-python-library/
- smbus2: used to read the measurement of the brightness sensor BH1750
  - [https://www.pololu.com/docs/0J73/15.9](https://www.pololu.com/docs/0J73/15.9)

### How to mount a space in ram
Replace "full_path" with the exact path where you want the ram folder, not including the "[]", also you can change the size in size, actual size is 30mb in the command
#### `sudo mount -t tmpfs -o rw,size=30m tmpfs [full_path]` 
