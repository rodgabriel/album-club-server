const Error = (message: string) => {
  return {
    __typename: "Error",
    error: message,
  };
};

export default Error;
