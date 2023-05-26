# Univeral Telegram Notification Bot
The idea of this project is, that whenever there is a website that does not feature a notify function for a sold out product, you can now create that function yourself with this script.


## How to setup
Setting this bot up is pretty easy, but you will have to do some work yourself.


### Create a telegram bot
How to actually create the bot will not be elaborated here, you can take a look into [telegrams tutorial on the basics of bots](https://core.telegram.org/bots/tutorial) for that.

Important is, that you have your bots *access token* as well as the *chat id* between you and your bot. The following step will explain where you need to put those.


### .env file
After pulling this repository, you must create a new file in the main directory called ```.env```.
This file will contain some variables that you need to fill out with your telegram bot information. The files content should look like this:
```
TELEGRAM_ACCESS_TOKEN="your bots access token"
TELEGRAM_CHAT_ID="your chat id with the bot"
```
Replace the text between the quotation marks with your bots information and you are done!


### Creating a service
A service in this context is a script that checks the availability of some real world product on some website. How the script achieves that is completely up to you, the only requirement for your script is that it exports a json object called ```service_info``` that has the following properties:
|property|type|description|
|---|---|---|
|title|text|A short name for your service, e.g. the name of the product you want to check availability for|
|available_message|text|A short message you want to receive as soon as the product is available again|
|interval|text|A [crontab string](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules?hl=en) describing on what schedule you want your service to be executed|
|perform_check|function|An *async* function returning true or false, indicating the availablity of the product|

If your service does not export the object correctly, it will be skipped when starting the application!

First create a new file in the ```services/``` folder, the name does not matter but it must be a ```.js``` file.
This is how a script could look like:

```services/test.js```
```
export const service_info = {
    title: 'Some product',
    available_message: 'Your product is available again!',
    interval: '0 * * * *', //runs every hour
    perform_check: check
};

async function check() {
    const is_available = true;

    return is_available;
}
```

The application will now automatically detect your service script and execute it according to the specified info in the exported service_info object.

### Running the bot
Now that you have your service created and your bot setup, you can start the application. We will do that with Docker.
First make sure you have [Docker](https://www.docker.com/) installed. Then you can create a new image for the application by opening a terminal in the main directory where the ```Dockerfile``` is located and run following command:

```docker build -t telegram-notification-bot .```

And then create a new container with the newly created image:

```docker run -d -p 9000:9000 --name telegram-notification-bot telegram-notification-bot```

### That's it
With that you should now have your docker container running performing the availability check regularly.
