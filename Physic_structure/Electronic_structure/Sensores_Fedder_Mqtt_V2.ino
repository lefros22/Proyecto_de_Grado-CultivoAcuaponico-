/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com  
*********/
//Lybrary comunication
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
//Librarys SENSORS AND OTHER
#include <HardwareSerial.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Replace the next variables with your SSID/Password combination
//const char* ssid = "LUIS1234";
//const char* password = "luisloco";
const char* ssid = "LuisyKaren";
const char* password = "luismanda";


// Add your MQTT Broker IP address, example:
//const char* mqtt_server = "192.168.1.144";
//const char* mqtt_server = "192.168.134.57";
const char* mqtt_server = "192.168.7.4";
WiFiClient espClient;
PubSubClient client(espClient);
const char* device_name="ESP32";
long lastMsg = 0;
char msg[50];
int value = 0;

//uncomment the following lines if you're using SPI
/*#include <SPI.h>
#define BME_SCK 18
#define BME_MISO 19
#define BME_MOSI 23
#define BME_CS 5*/



//GLOBALS GENERIC
#define VREF 3.3     
StaticJsonDocument<500> VarSensadas;
char result[500];

//----VARIABLES SENSORES-----
//------Turbidez-------
#define TurbidezSensorPin 32
#define TURBIDEZ_Samples  30            // sum of sample point

int TURBIDEZ_analogBuffer[TURBIDEZ_Samples];     // store the analog value in the array, read from ADC
int TURBIDEZ_Index = 0;
float TURBIDEZ_averageVoltage = 0;
float turbidezValue = 0;
//--------Temperature-----
// GPIO where the DS18B20 is connected to
const int oneWireBus = 4;     
float temperature = 25;       // current temperature for compensation
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
//--------TDS-------
#define TdsSensorPin 33
#define TDS_Samples  30            // sum of sample point

int TDS_analogBuffer[TDS_Samples];     // store the analog value in the array, read from ADC
int TDS_Index = 0;
float TDS_averageVoltage = 0;
float tdsValue = 0;
//-----PH------
#define PHSensorPin 34            //pH meter Analog output to Arduino Analog Input 0
#define ph_Offset 0.10            //deviation compensate
#define PH_Samples  30

int PH_analogBuffer[PH_Samples];     // store the analog value in the array, read from ADC
int PH_Index = 0;
float PH_averageVoltage = 0;
float phValue = 0;

//------OD------
#define ODSensorPin 35            //pH meter Analog output to Arduino Analog Input 0
#define OD_Samples  30
#define VREF2 3300    //VREF (mv)
#define ADC_RES 4096 
uint16_t ADC_Raw;
uint16_t ADC_Voltage;
uint16_t odValue;


//Single point calibration needs to be filled CAL1_V and CAL1_T
#define CAL1_V (1050) //mv
#define CAL1_T (25)   //℃
//Two-point calibration needs to be filled CAL2_V and CAL2_T
//CAL1 High temperature point, CAL2 Low temperature point
#define CAL2_V (1300) //mv
#define CAL2_T (15)   //℃

const uint16_t DO_Table[41] = {
    14460, 14220, 13820, 13440, 13090, 12740, 12420, 12110, 11810, 11530,
    11260, 11010, 10770, 10530, 10300, 10080, 9860, 9660, 9460, 9270,
    9080, 8900, 8730, 8570, 8410, 8250, 8110, 7960, 7820, 7690,
    7560, 7430, 7300, 7180, 7070, 6950, 6840, 6730, 6630, 6530, 6410};

int16_t readDO(uint32_t voltage_mv, uint8_t temperature_c)
{
  uint16_t V_saturation = (uint32_t)CAL1_V + (uint32_t)35 * temperature_c - (uint32_t)CAL1_T * 35;
  return (voltage_mv * DO_Table[temperature_c] / V_saturation);
}


//-----FEDDER-----
#define EN_PIN    13 //enable (CFG6)
#define STEP_PIN  12 //step
#define DIR_PIN   27 //direction
int cant_pasos_fedder=96;
int fedder_Index=0;












//-----Sensors----
void Sense_temperature(){
  sensors.requestTemperatures(); 
  temperature= sensors.getTempCByIndex(0);
  VarSensadas["TEMP"]=temperature;
  }

void Sense_turbidez(){
  for(TURBIDEZ_Index=0; TURBIDEZ_Index<TURBIDEZ_Samples; TURBIDEZ_Index++){
    TURBIDEZ_analogBuffer[TURBIDEZ_Index] = analogRead(TurbidezSensorPin);    //read the analog value and store into the buffer
    delay(5);
    //wait 40ms
  }
  // read the analog value more stable by the median filtering algorithm, and convert to voltage value
  TURBIDEZ_averageVoltage = (getMedianNum(TURBIDEZ_analogBuffer,TURBIDEZ_Samples) * (float)VREF / 4096.0)-1.5;
  //convert voltage value to tds value
  turbidezValue=1.0/(TURBIDEZ_averageVoltage*10+0.0001);
  VarSensadas["TURBIDEZ"]=turbidezValue;
}




void Sense_TDS(){
  for(TDS_Index=0; TDS_Index<TDS_Samples; TDS_Index++){
    TDS_analogBuffer[TDS_Index] = analogRead(TdsSensorPin);    //read the analog value and store into the buffer
    delay(5);
    //wait 40ms
  }
  // read the analog value more stable by the median filtering algorithm, and convert to voltage value
  TDS_averageVoltage = getMedianNum(TDS_analogBuffer,TDS_Samples) * (float)VREF / 4096.0;
  //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0)); 
  float compensationCoefficient = 1.0+0.02*(temperature-25.0);
  //temperature compensation
  float compensationVoltage=TDS_averageVoltage/compensationCoefficient;
  //convert voltage value to tds value
  tdsValue=(133.42*compensationVoltage*compensationVoltage*compensationVoltage - 255.86*compensationVoltage*compensationVoltage + 857.39*compensationVoltage)*0.5;
  VarSensadas["TDS"]=tdsValue;
  //send msj queque tdsValue;
}

void Sense_PH(){
  for(PH_Index=0; PH_Index<PH_Samples; PH_Index++){
    PH_analogBuffer[PH_Index] = analogRead(PHSensorPin);    //read the analog value and store into the buffer
    delay(5);
    //wait 40ms
  }
  // read the analog value more stable by the median filtering algorithm, and convert to voltage value
  PH_averageVoltage = getMedianNum(PH_analogBuffer,PH_Samples) * (float)VREF / 4096.0;
  //convert voltage value to ph value
  phValue = 6.2*PH_averageVoltage+ph_Offset;
  VarSensadas["PH"]=phValue;
  Serial.println(PH_averageVoltage);
  //send msj queque tdsValue;
}
// OD
void Sense_OD(){
  ADC_Raw = analogRead(ODSensorPin);
  ADC_Voltage = uint32_t(VREF2) * ADC_Raw / ADC_RES;
  //send msj queque tdsValue;
  odValue = readDO(ADC_Voltage, uint16_t(temperature));
  VarSensadas["OD"]= String(odValue);
}


void Dosificar_Fedder(){
  for(fedder_Index=0; fedder_Index<cant_pasos_fedder; fedder_Index++){
  //make steps
    digitalWrite(STEP_PIN, HIGH);
    delay(5);
    digitalWrite(STEP_PIN, LOW);
    delay(5); 

  }
}



void setup() {
  //COMUNICAION MQTT
  Serial.begin(115200);
  // default settings
  // (you can also pass in a Wire library object like &Wire2)
  //status = bme.begin();  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  //SENSORS
    //tds sensor
  pinMode(TdsSensorPin,INPUT);
  pinMode(TurbidezSensorPin,INPUT);
  pinMode(PHSensorPin,INPUT);
  pinMode(oneWireBus, INPUT_PULLUP);
  // Start the DS18B20 sensor
  sensors.begin();

  //FEDDER
  //set pin modes
  pinMode(EN_PIN, OUTPUT);
  digitalWrite(EN_PIN, HIGH); //deactivate driver (LOW active)
  pinMode(DIR_PIN, OUTPUT);
  digitalWrite(DIR_PIN, LOW); //LOW or HIGH
  pinMode(STEP_PIN, OUTPUT);
  digitalWrite(EN_PIN, LOW); //activate driver

}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    messageTemp += (char)message[i];
  }
  Serial.println(messageTemp);

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic esp32/output, you check if the message is either "on" or "off". 
  // Changes the output state according to the message
  if (String(topic) == "esp32/input") {
    client.publish("esp32/output", "Recibi un mensaje");
    if(messageTemp == "Sensar"){
      Sense_temperature();
      Sense_TDS();
      Sense_PH();
      Sense_turbidez();
      Sense_OD();
      serializeJson(VarSensadas,result);
      client.publish("esp32/sensors", result);
      Serial.println("result:");
      Serial.println(result);
    }
    else if(messageTemp == "Dosificar"){
      Dosificar_Fedder();
      client.publish("esp32/output", "Dosifico");
    }
    else{
      client.publish("esp32/output", "No clasificado");
      }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(device_name)) {
      Serial.println("connected");
      // Subscribe
      client.publish("esp32/output", "holis2");
      client.subscribe("esp32/input");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

// median filtering algorithm
int getMedianNum(int bArray[], int iFilterLen){
  int bTab[iFilterLen];
  for (byte i = 0; i<iFilterLen; i++)
  bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0){
    bTemp = bTab[(iFilterLen - 1) / 2];
  }
  else {
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  }
  return bTemp;
}
