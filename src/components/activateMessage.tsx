import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRegisterUser } from "../api/user";
import { IUserRespons } from "../types/User";

export const ActivateMessage = () => {
  const { activatedToken } = useParams<{ activatedToken: string }>();

  const getResponse = async () => {
    if (!activatedToken) {
      throw new Error('No activation token provided');
    }
    const resp = await getRegisterUser(activatedToken);

    return resp.data;
  };
  
  console.log('activatedToken', activatedToken);

  const { error, isLoading, isSuccess } = useQuery<IUserRespons, Error>({
    queryKey: ['activateUser', activatedToken],
    queryFn: getResponse,
    enabled: !!activatedToken,
  });

  console.log('error, isLoading, isSuccess', error, isLoading, isSuccess)

  if (isLoading) {
    return <p>Activating your account...</p>;
  }

  if (error) {
    return <p>Something went wrong during activation!</p>;
  }

  if (isSuccess) {
    return (
      <div>
        <h1>Activation Status:</h1>
        <p>Your account was successfully activated!</p>
      </div>
    );
  }
}