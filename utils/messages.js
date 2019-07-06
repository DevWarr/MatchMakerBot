
// TEMPLATE FOR COPY/PASTE

const messages = {

    // user.id
    userMention: `<@${user.id}> `,

    /*
        looking
        available
        inGame
        doNotDisturb
        challenger
        ok
    */
    mainInfo: `Click on a reaction emoji to set your matchmaking role!\n\n${msgInfo.looking} Looking for Opponent\n${msgInfo.available} Potentially Available\n${msgInfo.inGame} In Game\n${msgInfo.doNotDisturb} Do Not Disturb\n\nIf a user is looking for an opponent, there will be a message down below. If you would like to challenge them, click the ${msgInfo.challenger} emoji.\nThey can accept your challenge by clicking the ${msgInfo.ok} emoji.\n\nNeed help, have suggestions, or see bugs? Please notify <@296327135491129344> and help will reach you soon!`,

    /*
        looking.id
        available.id
        MAKE SURE TO USE stringArray[Math.floor(Math.random(stringArray.length))]
    */
    looking: {
        stringArray: [`**is looking for an opponent!**`, `**seeks a new challenger.**`, `**is searching for someone to fight!**`],
        userMentions: `<@${looking.id}> <@${available.id}>`
    },

    /*
        lookingUser.id
        MAKE SURE TO USE stringArray[Math.floor(Math.random(stringArray.length))]
    */
    challenger: {
        stringArray: [`challenges <@${lookingUser.id}>!`, `offers to play with <@${lookingUser.id}>.`, `wants to fight <@${lookingUser.id}>.`]
    },

    // matchName
    matchCreated: `${matchName} now in progress. Please proceed to DMs if you wish to communicate.\nThe match has begun!`
}

