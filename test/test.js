var test = require('tape')
var jsdom = require('jsdom')
require('jsdom-global')()
var pulsar = require('../index.js')

var fireEvent = function () {
  var scrollEvent = window.document.createEvent("Event")
  scrollEvent.initEvent("scroll", true, true)
  window.dispatchEvent(scrollEvent)
}

test('register', function (t) {
  t.plan(1)
  pulsar.register('fires on event', function () {
    pulsar.deregister('fires on event')
    t.pass()
  })
  fireEvent()
})

test('deregister', function (t) {
  t.plan(1)
  pulsar.register('should not be caled', function () {
    t.fail()
  })
  pulsar.deregister('should not be caled')
  fireEvent()
  t.pass()
})
