
export const InformMessage = () => {
  // const { email } = useUsersContext();
  // console.log('inform email');
  return (
    <div className="max-w-[700px] bg-yellow-100 mx-auto flex justify-center py-7 px-16 rounded-lg mt-5 border border-gray-400 ">
      <p>We sent verification letter on your email: 
        {/* <span className="text-lg font-semibold"> {email}</span> ! */}
        </p>
    </div>
  );
};
