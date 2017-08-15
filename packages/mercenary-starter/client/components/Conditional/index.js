export default function Conditional(props) {
  return props.if ? (props.then || null) : (props.else || null);
}
