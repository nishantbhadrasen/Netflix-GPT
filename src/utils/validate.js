export const checkValidData = (email, password, fullName, isSignInForm) => {
  if (!email) return "Email is required!";
  if (!password) return "Password is required!";
  if (!isSignInForm && !fullName) return "Full Name is required for Sign Up!";

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isSignInForm) {
    const isFullNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName);
    if (!isFullNameValid) return "Name is not Valid!";
  }

  if (!isEmailValid) return "Email is not Valid!";
  if (!isPasswordValid) return "Password is not Valid!";

  return null;
};
