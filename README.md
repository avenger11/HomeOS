![GitHub last commit](https://img.shields.io/github/last-commit/avenger11/HomeOS)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/avenger11/HomeOS)](https://github.com/avenger11/HomeOS/releases/latest)
![Stargazers](https://img.shields.io/github/stars/avenger11/HomeOS.svg?)

# HomeOS 17 Dashboard

This is my dashboard for Home Assistant currently in complete recode from scratch.

# My Setup and Hardware

I recently change my approach to use containers instead of Home Assistant VM for the following reason:
- My home assistant take more than 5 mins to restart all the extension etc..
- Restart the VM and Home Assistant take more than 15 mins
- There is update every week ( I want to keep up but I don't have 1h to reserve every week for update in case something goes wrong and I need to use a backup)
- If home assistant crash during update/restart EVERYTHING stop

With container I separate Home Assistant,Node-Red,Zigbee2MQTT,Emqx & MariaDB.
- I'm using [mqdockerup](https://github.com/MichelFR/MqDockerUp) for update notification and update
- Restart one container for update take less than a minute ( And I will find a way so it take less than a second even for Home Assistant 😄)
- I use Zigbee over ethernet so I'm not relying on USB stick.

So today, I'm running Home Assistant, Node-Red, Zigbee2Mqtt, Emqx and MariaDB in docker container on my Synology DS920+ (with additional SSD and 20Go of RAM)

The Wall Mount tablet is a FireHD 10 from amazon running Fully Kiosk Browser.

# As of 10 November 2023
![image](https://github.com/avenger11/HomeOS/assets/37946892/d2426c28-01fb-428d-a587-0cd758c55482)
![image](https://github.com/avenger11/HomeOS/assets/37946892/b39fdee5-c7bf-4089-9087-73879321a86d)



# As of 31 October 2023

![image](https://github.com/avenger11/HomeOS/assets/37946892/67b3fb8a-bd04-4db6-89a9-fab2c7f1a365)


# As of 28 October 2023
![image](https://github.com/avenger11/HomeOS/assets/37946892/a5c1867b-0695-4c1d-bab9-89fe3c0d9682)



