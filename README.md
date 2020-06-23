# Tiny Pulsar
[![Build Status](https://travis-ci.org/grindcode/tiny-pulsar.svg?branch=master)](https://travis-ci.org/grindcode/tiny-pulsar) [![Dependency Status](https://david-dm.org/grindcode/tiny-pulsar.svg)](https://david-dm.org/grindcode/tiny-pulsar) [![devDependency Status](https://david-dm.org/grindcode/tiny-pulsar/dev-status.svg)](https://david-dm.org/grindcode/tiny-pulsar#info=devDependencies)

Minimal footprint library that triggers a callback when the user scrolls or resizes the browser.

## Get Started
```bash
npm install tiny-pulsar
```

## API
### register(namespace, callback)
Register a _callback_ to be fired. Registration is accumulative and _namespace_ is not unique.
* `namespace`: Callback namespace. (**String**)
* `callback`: Function to be fired. (**Function**)

### deregister(namespace)
Deregister all _callbacks_ registered with the same _namespace_.
* `namespace`: Callback namespace. (**String**)

### Usage
```javascript
import { register, deregister } from 'tiny-pulsar'

register('this is a namespace', function () {
  // → your code goes here
  deregister('this is a namespace')
})

```

## License
See the [License](LICENSE) file.
