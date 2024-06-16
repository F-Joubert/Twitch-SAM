# Twitch Integrated: Software Automatic Mouth

## Project Overview
Next.js app, combining [tmi.js](https://github.com/tmijs/tmi.js) for easy access to Twitch's API, with [SAM](https://github.com/discordier/sam) as the core text to speech engine.

## Current Capability
- SAM currently recognises the following events:
  - Chat Messages
  - Bit redeems
  - Subscriptions and Resubscriptions
- Change voices and play messages on demand in `/playground`
- Save voice configurations under names recognised as message prefixes.

## What needs to be done
- Currently messages are unable to be extracted from channel point redeems.
- Bit thresholds need to be properly implemented.
- Enabled voices need to be fixed.
- Add ability to choose monitored channel.
