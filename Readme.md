
# adjust-engine

  Position an element relative to another element. This repository is just
  the calculation engine behind the adjustments.

## Installation

```
npm install adjust-engine
```

## API

##### `adjust = Adjust(options)`

Initialize an adjustment. Supports the following options:

- attachment <string>: Alignment point of the element you're moving. Supports CSS style adjustments.
  Here are some possibilities:

```
left top
right bottom
center middle
10% 16% (x y)
```

- target <string>: Alignment point of the target (or host) element. Supports same CSS style adjustments as `attachment`.
- offset <object>: Specify an offset to apply to the attachment element. Here's some examples

```
bottom: -10
left: 100
right: 50
top: -25
```

- flip <boolean>: Defaults to `true`. Automatically flip the element if the adjustment causes the attachment to be out of viewport. You should specify a `viewport_position` for flip to work properly.

##### `adjust(attachment_position, target_position, [ viewport_position ])`

Get a position of where the attachment should be. Here's a full example:

```js
var adjust = Adjust({
  attachment: 'center middle',
  target: 'center middle'
});

var attachment = {
  height: 50,
  width: 50
}

var target = {
  top: 0,
  left: 0,
  right: 100,
  bottom: 100
}

var position = adjust(attachment, target)
assert.deepEqual(position, {
  top: 25,
  left: 25,
  width: 50,
  height: 50,
  right: 75,
  bottom: 75
})
```

## Tests

```
make test
```

## TODO

- memoize

## License

MIT
