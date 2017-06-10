export default function Conditional(props) {
  return props.if ? props.then : props.else;
}
