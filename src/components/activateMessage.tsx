import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CustomLoader } from "./customLoader";
import { UserWithoutToken } from "../types/User";
import { authService } from "../services/authService";
import { accessTokenService } from "../services/accessTokenService";

export const ActivateMessage = () => {
  const { activatedToken } = useParams<{ activatedToken: string }>();
  const navigate = useNavigate();

  const getResponse = async (): Promise<UserWithoutToken> => {
    if (!activatedToken) {
      throw new Error("No activation token provided");
    }

    const { accessToken, ...user } = await authService.activate(activatedToken);
    accessTokenService.save(accessToken);

    return user;
  };

  const { error, isLoading, isSuccess } = useQuery<UserWithoutToken, Error>({
    queryKey: ["activateUser", activatedToken],
    queryFn: getResponse,
    enabled: !!activatedToken
  });

  console.log("error, isLoading, isSuccess", error, isLoading, isSuccess);

  if (isLoading) {
    return <CustomLoader loaderSize={140} paddingY={150} />;
  }

  if (error) {
    navigate("/login");
    return null;
  }

  if (isSuccess) {
    navigate("/companies");
    return null;
  }


  return null;;
};
