import { useUsersContext } from "../controllers/useUsersContext";

export const Header: React.FunctionComponent = () => {
  const { currentUser } = useUsersContext();
  console.log("currentUser", currentUser);

  return (
    <header className="h-22 w-full bg-white shadow-lg p-5 px-10 flex justify-between">
      <div className="flex space-x-5">
        <div className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/jqhue1R.png"
            alt="companies"
            className="w-10 h-10"
          />
          <p>companies</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="https://i.imgur.com/7UiehPI.png"
            alt="companies"
            className="w-10 h-10"
          />
          <p>dashboard</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-[40px] w-[40px] rounded-full shadow-lg p-1 mr-3">
          {/* <img src={currentUser?.avatar } alt="avatar" /> */}
          <img src="https://i.imgur.com/aX3x1wT.png" alt="avatar" />
        </div>
        {/* <p>{currentUser?.name}</p> */}
        <p>Loren</p>
      </div>
    </header>
  );
};
