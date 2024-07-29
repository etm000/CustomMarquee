# Documentation

This component is not intended to be a replacement for marquee. It is just a component that functions like a marquee and will probably have a lot of problems.

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

**Do not forget to put `slot` and adding only one direct child is allowed.**

There are some attributes to change the way it works.
### Direction
```html
<c-marquee direction="right">
  <span slot="text">Some Text</span>
</c-marquee>
```
Valid options for direction are `left`, `right`, `up` and `down`. Default value for direction is `left`.

### Duration
```html
<c-marquee duration="5000">
  <span slot="text">Some Text</span>
</c-marquee>
```
It is literally the loop duration. Duration attribute takes only milliseconds. As shown in the example above, `5000` means `5 seconds`. Default value for the duration is `5000`.

### Start Position
_Not finished yet_