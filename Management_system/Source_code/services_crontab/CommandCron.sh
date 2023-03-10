#system reboot at 00:15 every day
15 0 * * * /sbin/shutdown -r now
#restart of services that use token in database
20 */2 * * * sudo systemctl restart EstadoControl.service
20 */2 * * * sudo systemctl restart EstadoActuadores.service
20 */2 * * * sudo systemctl restart ActPinesBD.service
20 */2 * * * sudo systemctl restart SensoresBD.service
20 */2 * * * sudo systemctl restart SensoreExtBD.service
20 */2 * * * sudo systemctl restart PredictionsBD.service
#Internet status check every hour
0 * * * * /home/acuaponito/Desktop/Servicios/askInternet.sh
#running webcam streaming script every minute
* * * * * /home/acuaponito/Desktop/Servicios/webcam.sh
