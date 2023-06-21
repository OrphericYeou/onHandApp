export default (user, roleIdentifier) => {
  if (!!user && !!user.roles && Array.isArray(user.roles) && user.roles.length > 0 && user.roles.length) {
    return user.roles[0].title === String(roleIdentifier).toUpperCase();
  } else {
    return false;
  }
}
