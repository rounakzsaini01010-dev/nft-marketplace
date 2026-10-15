export function isNavItemActive(to, location) {
  const [base, hash] = to.split("#");
  if (location.pathname !== base) return false;
  return hash ? location.hash === `#${hash}` : !location.hash;
}
