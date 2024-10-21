import { useUsersContext } from "../controllers/useUsersContext";

export const InformMessage = () => {
  const { currentUser } = useUsersContext();

  return (
    <div className="max-w-[700px] bg-yellow-100 mx-auto flex justify-center py-7 px-16 rounded-lg mt-5 border border-gray-400 ">
      <p>We sent verification letter on your email: 
        <span className="text-lg"> {currentUser?.email}</span> !
        </p>
    </div>
  );
};
