export default (value, singular, plural) => {
  if (value === 0) {
    return `Sin ${plural}`;
  }
  if (value === 1) {
    return `${value} ${singular}`;
  }
  if (value > 1) {
    return `${value} ${plural}`;
  }
};
