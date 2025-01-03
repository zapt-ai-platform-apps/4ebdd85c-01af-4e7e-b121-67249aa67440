# SMS Button App

An app that allows users to create custom buttons with a name, phone number, and message. Clicking on a button sends an SMS message to the specified phone number. Users can delete buttons they no longer need, and buttons are stored persistently, remaining after app restart.

## User Journeys

1. [Create Custom SMS Button](docs/journeys/create-custom-sms-button.md) - Create a button to send SMS messages with one click.
2. [Send SMS Message](docs/journeys/send-sms-message.md) - Send an SMS message by clicking a custom button.
3. [Delete Custom SMS Button](docs/journeys/delete-custom-sms-button.md) - Remove a custom SMS button you no longer need.

## Environment Variables

The following environment variables are required:

- `TWILIO_ACCOUNT_SID` - Your Twilio Account SID.
- `TWILIO_AUTH_TOKEN` - Your Twilio Auth Token.
- `TWILIO_PHONE_NUMBER` - Your Twilio Phone Number (the number messages will be sent from).

## External Services

- **Twilio**: Used for sending SMS messages.

## Made on ZAPT

This app was made on [ZAPT](https://www.zapt.ai).
