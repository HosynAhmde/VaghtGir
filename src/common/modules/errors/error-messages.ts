type ErrorType = 'post' | 'user';

type ErrorMessages = {
  [key in ErrorType]: {
    notFound: string;
    alreadyExist: string;
  };
};

function generateErrorMessage(errorTypes: ErrorType[]): ErrorMessages {
  const errorMessages: ErrorMessages = {} as ErrorMessages;

  errorTypes.forEach(type => {
    const action = type.toLowerCase();
    errorMessages[type] = {
      notFound: `${action}.not_found`,
      alreadyExist: `${action}.already_exist`,
    };
  });

  return errorMessages;
}

const errors = generateErrorMessage(['post', 'user']);

export { errors };
