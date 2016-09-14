This is a simple raspberrypi setup demonstrating the usage of Skygear JS SDK in
reapberrypi.

First, we assume you follow the Installation guide on 
[raspberrypi.org](https://www.raspberrypi.org/documentation/installation/).
And have clean Raspbian installed on yout pi.

### Setup the raspberrypi for running nodejs
1. Find your raspberrypi IP at your router, or follow the instruction for
   scaning your subnet:
   https://www.raspberrypi.org/documentation/remote-access/ip-address.md
1. ssh to raspberrypi, `ssh pi@192.168.x.x` default password: `raspberry`
   - Is is suggested to change your password, use command `passwd`. For more
     detail instruction, please follow the instruction here:
     https://www.raspberrypi.org/documentation/linux/usage/users.md 
1. Update the node environment:
    - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
    - `sudo apt-get install nodejs`
1. Check your node installation by runing `node -v`, it should show 6.x. You may
   also check your npm version by runing `npm -v`.


### Loading this demo project into your raspberrypi

This project include a simple health report of the raspberrypi to Skygear. It
also include command to list out the latest health data of the raspberrypi.

1. clone the project
   - `git clone https://github.com/skygear-demo/raspberrypi-example.git`
1. Go to the project directory
   - `cd raspberrypi-example`
1. Install the required deps about this project
   - `npm install`
1. Before kicking up the example, please specific your environment need to
   make the example works. An example `skygear.sh.example` is located at this
   repository. Copy it to `/etc/profile.d/skygear.sh`. Edit the `SKYGEAR_API`and
   `SKYGEAR_ENDPOINT` value according to the value display at
   https://portal.skygear.io
    -  Skygear is user base system, you can register your raspberrypi as a normal
       user and interact with Skygear. We suggest to use Serial No. and Mac
       address as the username and password. Which is the provided in the
       `skygear.sh.example` 
    -  You are free to use other system identifer, such as IPv6 Address. The
       principle is a tuple that are safe to identifier your device at Skygear.
1. After the value is edit, run `. /etc/profile.d/skygear.sh` to activate the
   environment variable for your current session.
1. Install the health check service as system services,
   ``` shell
   sudo cp skygear-health.service /etc/systemd/system/skygear-health.service
   sudo systemctl daemon-reload
   sudo systemctl start skygear-health
   sudo systemctl enable skygear-health
   ```
1. Check the log by `sudo journalctl --follow -u skygear-health`

