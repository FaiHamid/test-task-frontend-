import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CustomLoader } from "./customLoader";
import { UserWithoutToken } from "../types/User";
import { useUsersContext } from "../controllers/useUsersContext";

export const ActivateMessage = () => {
  const { activatedToken } = useParams<{ activatedToken: string }>();
  const navigate = useNavigate();
  const { activate } = useUsersContext();

  const getResponse = async () => {
    if (!activatedToken) {
      throw new Error("No activation token provided");
    }

    return await activate(activatedToken);
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
