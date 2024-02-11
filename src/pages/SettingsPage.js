import Navbar from "../components/Navbar/Navbar";

export const SettingsPage = () => {
  return (
    <form>
      <Navbar />
      <h1>Settings</h1>
      <h3> <a href='/ChangePassword'>Change Password</a> </h3>
      <h3> <a href='/'>Log Out</a> </h3>
    </form>
  );
};
