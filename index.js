var raf = require('raf')

// Registered events
var events = []
// Are event listeners registered
var deployed = false
// Is a browser enviroment
var isBrowser = typeof window !== "undefined"

// Register an event providing a namespace and callback.
// Several events can be registered with the same namespace.
var register = function (namespace, fn) {
  if (!isBrowser) return
  events = events.concat({ namespace: namespace, fn: fn })
  deploy()
}

// Deregister an event providing a namespace.
// All events registered with the same namespace will be removed.
var deregister = function (namespace) {
  if (!isBrowser) return
  var filterEventByNamespace = function (event) {
    return event.namespace !== namespace
  }
  events = events.filter(filterEventByNamespace)
  if (!events.length) {
    retract()
  }
}

// Fire all registered events if a change has been triggered.
var fire = function () {
  events.forEach(function (event) {
    event.fn()
  })
}

// Triggers a change
var touch = function () {
  if (deployed) {
    raf(fire)
  }
}

// Register event listeners that will trigger a change
var deploy = function () {
  if (deployed) return
  window.addEventListener('scroll', touch)
  window.addEventListener('resize', touch)
  deployed = true
}

// Deregister event listeners that will trigger a change
var retract = function () {
  if (!deployed) return
  window.removeEventListener('scroll', touch)
  window.removeEventListener('resize', touch)
  deployed = false
}

module.exports = {
  register: register,
  deregister: deregister
}
