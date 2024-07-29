# Documentation

This component is not intended to be a replacement for marquee. It is just a component that functions like a marquee and will probably have a lot of problems. View the documentation with examples [here](https://etm000.github.io/CustomMarquee/docs/).

To import the code:
```html
<script type="module" src="https://etm000.github.io/CustomMarquee/src/index.js"></script>
```

To use the marquee:
```html
<c-marquee>
  <span slot="text">Some Text</span>
</c-marquee>
```

**Adding only one direct child is allowed. Do not forget to put `slot` attribute with the value of `text` to the child.**

There are some attributes to change the way it works.
### Direction
```html
<c-marquee direction="right">
  <span slot="text">Some Text</span>
</c-marquee>
```
Valid options for direction are `left`, `right`, `up` and `down`. Default value for the direction is `left`.

### Duration
```html
<c-marquee duration="5000">
  <span slot="text">Some Text</span>
</c-marquee>
```
It is literally the loop duration. Duration attribute accepts only milliseconds. As shown in the example above, `5000` means `5 seconds`. Default value for the duration is `5000`.

### Start Position
```html
<c-marquee start-position="center">
  <span slot="text">Some Text</span>
</c-marquee>
```
Start Position has only 2 valid options which are `center` and `offset` (or anything except `center`). Default value is `offset`.