# Sytemd services

This folder contains the config files of systemd services 

## Basic commands

### ------to the daemon--------
### `cd /etc/systemd/system`

### ------List the daemons--------
### `ls`

### ---- comands to mount a daemon---
### `sudo nano [name service].service` to create the service file
### `chmod +x /home/acuaponito/Desktop/Servicios/MainControl_service.py` give execution permissions to the script that will execute the service
### `sudo systemctl enable [name service].service` enable service
### `sudo systemctl daemon-reload` reload the new service via daemon
### `sudo systemctl start [name service].service` start the new service
### `sudo systemctl status [name service].service` check the status of the new service
### ---- comands if something is wrong---
### `sudo systemctl stop [name service].service` optional to kill service running
### `sudo systemctl disable [name service].service` optional to disable service running

## Basic daemon or service

``` bash
[Unit]
Description=send sensor to bd
After=multi-user.target network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /home/acuaponito/Desktop/Servicios/[name service].py
User=acuaponito
WorkingDirectory=/home/acuaponito/Desktop/Servicios
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
