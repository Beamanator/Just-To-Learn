<!-- Note: slots are similar to react's {props.children} -->
<slot name="before" />
<button>
  <slot>Default button text</slot>
</button>
<slot name="after" />
