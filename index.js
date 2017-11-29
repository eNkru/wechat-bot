const { Wechaty } = require('wechaty')
const md5 = require('md5')
const fetch = require('node-fetch')

const bot = Wechaty.instance()

bot.on('scan', (url, code) => {
    let loginUrl = url.replace('qrcode', 'l')
    require('qrcode-terminal').generate(loginUrl)
    console.log(url)
})

.on('login', user => {
    console.log(`${user} login`)
})

.on('message', async msg => {
    const contactFrom = msg.from()
    const content = msg.content()
    const room = msg.room()
    const contactNameFrom = contactFrom.name()
    
    // Do not logging any conversation from wechat offical.
    if(contactFrom.official()) {
        return
    }

    // Logging the conversation.
    if(room) {
        console.log(`In [${room.topic()}] room, [${contactNameFrom}] says: ${content}`)
    } else {
        console.log(`[${contactNameFrom}] says: ${content}`)
    }

    // Must not do any action if the message is from yourself.
    if(msg.self()) {
        return
    }

    // Handle the actions.
    if(contactNameFrom === '木木' && !room) {
        const apiUrl = 'http://www.tuling123.com/openapi/api'
        const uid = md5(contactFrom.id)
        const payload = `{"key": "4424be4bf32c45ad805812875dbc3f08", "info": "${content}", "userid": "${uid}"}`

        console.log(payload)
        let response = await fetch(apiUrl, {method: 'POST', body: payload})
        let data = await response.json()
        msg.say(data.text)
    }
})

.start()
