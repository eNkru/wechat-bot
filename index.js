const { Wechaty } = require('wechaty')

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
    const contact = msg.from()
    const content = msg.content()
    const room = msg.room()
    const contactName = contact.name()
    
    if(room) {
        console.log(`Room: ${room.topic()} Contact: ${contactName} Content: ${content}`)
    } else {
        console.log(`Contact: ${contactName} Content: ${content}`)
    }

    if(msg.self()) {return}

    if(contactName === '此间的少年') {
        msg.say('你和自己说话呢？')
    } else if (contactName === '木木') {
        msg.say('老婆老婆么么哒。')
    }
})

.start()
