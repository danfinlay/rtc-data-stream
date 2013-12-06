var quickconnect = require('rtc-quickconnect')
var duplexEmitter = require('duplex-emitter')
var rtcDataStream = require('./index.js')

var rtcConnection = quickconnect({
  signalhost: 'http://sig.rtc.io:50000',
  ns: 'dctest',
  data: true
})

rtcConnection.on('dc:open', function(channel, peerId) {
  console.log('data channel opened for peer: ' + peerId)

  var stream = window.stream = rtcDataStream(channel)
  var emitter = window.emitter = duplexEmitter(stream)

  emitter.emit('ready')
  emitter.on('ready', function() {
    console.log('got a ready')
  })

})
