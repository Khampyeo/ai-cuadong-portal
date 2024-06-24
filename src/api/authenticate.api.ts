export const login = async (body: ILogin) => {
  let response: any = {
    status: 404,
  };

  if (body.password === "123" && body.email === "kietnc3") {
    response = {
      status: 200,
    };
  }

  return response;
};

export const getAccount = async () => {
  const response = {
    status: 200,
    data: {
      name: "Admin",
      account: "kietnc3",
    },
  };
  return response;
};
