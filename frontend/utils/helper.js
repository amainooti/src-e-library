export const Roles = {
  Student: 4096,
  Admin: 2048,
};

export const convertRoles = (values) => {
  const newRole = [];
  for (const val of values) {
    const wordRole = Object.keys(Roles).find((key) => Roles[key] === val);
    if (wordRole) {
      newRole.push(wordRole);
    }
  }
  return newRole;
};
