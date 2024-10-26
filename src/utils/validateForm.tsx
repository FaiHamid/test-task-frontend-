function email(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return '';
}

const password = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return '';
};

const confirmPassword = (password: string, passwordToConfirm: string) => {
  if (!passwordToConfirm) {
    return 'Confirm password is required';
  }

  if (password !== passwordToConfirm) {
    return 'Confirm password is different';
  }

  return '';
}

const nameAndSurname = (name: string, field: string) => {
  const namePattern = /^[A-Za-z]+$/;

  if (!name) {
    return `${field} cannot be empty`;
  } else if (!namePattern.test(name)) {
    return `${field} can only contain English letters`;
  }

  return '';
};

export const validate= { email, password, confirmPassword, nameAndSurname };