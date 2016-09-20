# Skygear Working Example on Raspberry Pi

This is a simple Raspberry Pi setup demonstrating the usage of [Skygear JS SDK](https://docs.skygear.io/js/guide/) in
Raspberry Pi.

This demo project demonstrates the followings:

- register the active device on Skygear server
- send tempurature and other Raspberry Pi live information to the server periodically
- fetch recent records from Skygear server

Firstly please follow the installation guide on 
[raspberrypi.org](https://www.raspberrypi.org/documentation/installation/). We 
assume you would have a clean Raspbian installed on your pi device.

### Setup the Raspberry Pi to run nodejs
1. Find your Raspberry Pi IP at your router, or follow the instruction for
   scaning your subnet:
   https://www.raspberrypi.org/documentation/remote-access/ip-address.md
   
   Use `nmap` to scan IPs on your network. You may have to use `sudo` to get device info
   `sudo nmap -sP 192.168.0.0/22`
   
   result:

    ``` shell
    Host is up (0.0064s latency).
    MAC Address: B8:XX:XX:XX:XX:9X (Raspberry Pi Foundation)
    Nmap scan report for 192.168.2.XXX
    ```
   
1. ssh to the Raspberry Pi, `ssh pi@192.168.x.x` default password: `raspberry`
   - To change your password, use command `passwd`. For more detailed instruction,
     please follow the instruction here:
     https://www.raspberrypi.org/documentation/linux/usage/users.md 
1. Update the node environment:
    - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
    - `sudo apt-get install nodejs`
1. Check your node installation by runing `node -v`, it should show 6.x. You may
   also check your npm version by runing `npm -v`.


### Load this demo project into your Raspberry Pi

This project includes a simple health report of the Raspberry Pi to Skygear. It
also includes a command to list out the latest health data of the Raspberry Pi.

1. `cd /home/pi/`
1. Clone the project
   - `git clone https://github.com/skygear-demo/raspberrypi-example.git`
1. Go to the project directory
   - `cd raspberrypi-example`
1. Install the required deps for this project
   - `npm install`
1. Specify environment variables required by this demo app. A script is provided 
   to generate the `skygear.env` file needed. Checkout `SKYGEAR_API` 
   and `SKYGEAR_ENDPOINT` at https://portal.skygear.io
    -  Run `./skygear.sh gen SKYGEAR_ENDPOINT SKYGEAR_API`
    -  Skygear is a user based system, you can register your raspberrypi as a normal
       user to interact with Skygear. We suggest to use Serial No. and Mac
       address as the username and password respectively. The script is doing this as 
       a showcase.
    -  You could use other system identifers such as IPv6 Address as well. The
       principle is to have a tuple that could identify your device at Skygear.
1. After the value is edited, copy `skygear.sh`to `/etc/profile.d/skygear.sh`.
   Run `. /etc/profile.d/skygear.sh` to activate the environment variables for
   your current session.
1. Install the health check service as system services,

   ``` shell
   sudo cp skygear-health.service /etc/systemd/system/skygear-health.service
   sudo systemctl daemon-reload
   sudo systemctl start skygear-health
   sudo systemctl enable skygear-health
   ```

1. Check the log by `sudo journalctl --follow -u skygear-health`
1. Run `./query.js` to query and display the recent health data from Skygear.

