# The Match Maker

Documentation for The Match Maker Discord Bot

## Disclaimer

The idea for this bot came from an incredibly similar bot called Shock Bot [Check it out here!](https://github.com/jon12156/shockbot)

## What is The MatchMaker?

The goal of The MatchMaker is to, well, set up a custom matchmaking system via discord. Say goodbye to the days like this:

```
You: Hey, somebody want to play?
Everybody else: *has an entire conversation around you *
You: Aw...
```

And say hello to The MatchMaker!

## How does The MatchMaker work?

It starts in a text channel. You could call it `matchmaking` if you wish. Upon starting up, The Matchmaker will delete all messages, and create one message of its own.

This message outlines what users need to do to look for an opponent, challenge one another, and accept a match. 

And the easiest part? Everything happens with Emoji Reactions! No need to type any `!looking-for-opponent` commands or the like. React with the specified emojis, and the bot will take care of all that for you.

Once you've found a match, The Matchmaker will create two channels— 1 text and 1 voice— that only the two competitors can see.
Enter those channels, then find each other within the game of your choice. Wish to trash talk each other? Open a voice channel and speak destruction onto your opponent.

And of course, once your done, just send The MatchMaker the proper reaction emoji and the channels will be deleted for you! What happens in competition, stays in competition.

## What do I need for The MatchMaker to function happily?

In order for the matchmaker to work, you need a few things set up:
* Roles:
  * Looking for Opponents
  * Potentially Available
  * In Game
* Channels:
  * A Category Channel, like "MatchMaking"
  * Text Channel inside this category, for the MatchMaker to send its messages

## How do I set these roles and channels?

That's easy as well! **(Well, it will be once the commands have been properly set.)**

Stay tuned for an easy way to `!setrole inGame [role ID]` so The MatchMaker can adapt itself to your server.

### This code is broken! I can't use it!

Yes, silly. You can't use The Matchmaker without a token. If you'd like to use this code to create your own discord bot, feel free! The MatchMaker's credentials, however, remain hidden.