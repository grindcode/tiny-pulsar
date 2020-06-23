const raf = require('raf')

// Registered events
let events = []
// Are event listeners registered
let deployed = false
// Is a browser enviroment
const isBrowser = typeof window !== 'undefined'

// Register an event providing a namespace and callback.
// Several events can be registered with the same namespace.
function register (namespace, fn) {
  if (!isBrowser) return
  events = events.concat({ namespace: namespace, fn: fn })
  deploy()
}

// Deregister an event providing a namespace.
// All events registered with the same namespace will be removed.
function deregister (namespace) {
  if (!isBrowser) return
  events = events.filter(e => e.namespace !== namespace)
  if (!events.length) {
    retract()
  }
}

// Fire all registered events if a change has been triggered.
function fire () {
  events.forEach(function (event) {
    event.fn()
  })
}

// Triggers a change
function touch () {
  if (deployed) {
    raf(fire)
  }
}

// Register event listeners that will trigger a change
function deploy () {
  if (deployed) return
  window.addEventListener('scroll', touch)
  window.addEventListener('resize', touch)
  deployed = true
}

// Deregister event listeners that will trigger a change
function retract () {
  if (!deployed) return
  window.removeEventListener('scroll', touch)
  window.removeEventListener('resize', touch)
  deployed = false
}

module.exports = {
  register: register,
  deregister: deregister
}
