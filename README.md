This is a simple raspberrypi setup demonstrating the usage of Skygear JS SDK in
reapberrypi.

First, we assume you follow the Installation guide on 
[raspberrypi.org](https://www.raspberrypi.org/documentation/installation/).
And have clean Raspbian installed on yout pi.

### Setup the reapberrypi for running nodejs
1. Find your raspberrypi IP at your router, or follow the instruction for
   scaning your subnet:
   https://www.raspberrypi.org/documentation/remote-access/ip-address.md
1. ssh to raspberrypi, `ssh pi@192.168.x.x` default password: `raspberry
   - Is is suggested to change your password, use command `passwd`. For more
     detail instruction, please follow the instruction here:
     https://www.raspberrypi.org/documentation/linux/usage/users.md 
1. Update the node environment:
   `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
   `sudo apt-get install nodejs`
1. Check your node installation by runing `node -v`, it should show 6.x. You may
   also check your npm version by runing `npm -v`.
