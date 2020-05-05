export const errorsMessages = {
  username: {
    required: 'Username is required.',
    pattern: 'Username should be 3 - 18 [a-zA-Z0-9_-]'
  },
  password: {
    required: 'Password is required.',
    pattern: 'Password should be 6 - 16 [a-zA-Z0-9_-]'
  },
  firstName: {
    required: 'First Name is required.',
    pattern: 'First Name should consists only English alphabet.'
  },
  middleName: {
    required: 'Middle Name is required.',
    pattern: 'Middle Name should consists only English alphabet.'
  },
  lastName: {
    required: 'Last Name is required.',
    pattern: 'Last Name should consists only English alphabet.'
  },
  email: {
    required: 'Email is required.',
    email: 'Email is not valid.'
  },
  organizationName: {
    required: 'Organization Name is required.',
    pattern: 'Organization Name should should consists only English alphabet.'
  },
  organizationType: {
    required: 'Organization Type is required.'
  },
  organizationRole: {
    required: 'Organization Role is required.'
  },
  organizationRoleName: {
    required: 'Organization Role Name is required.',
    pattern: 'Organization Role Name should consists only English alphabet.'
  },
  organizationDocumentName: {
    required: 'Organization Document Name is required.',
    pattern: 'Organization Document Name /^[a-zA-Z1-9_-]*.pdf$/'
  }
};
