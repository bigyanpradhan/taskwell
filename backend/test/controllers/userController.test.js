describe("User Controller", () => {
  describe("Sign Up By User", () => {
    // User provides invalid inputs
    // User Provides valid inputs but user's email already exists(email is made to be distinct)
    // User provides valid inputs but error occurs
    // user provides valid inputs and the account is created(response checking)
  });
  describe("Sign In By User", () => {
    // User Provides invalid inputs
    // User Provides valid input but email doesn't match with registered users
    // User Provides valid input but password doesn't match with the registered email
    // User Provides valid inputs and user is verified but error occurs
    // User Provides valid input and is able to sign in(response checking)
  });
  describe("Send Reset Password Email", () => {
    // User provides invalid inputs
    // User Provides valid input but email doesn't match with registered users
    // User provides valid input is verified as registered but mailresponse encounters an error
    // user provides valid input and mailresponse is sent properly(response checking)
  });
  describe("Password Change Initiated By User", () => {
    // User provides invalid inputs
    // User has invalid reset token
    // User has valid reset token but updateing password encounters error
    // User has valid token and update works properly(response cheking)
  });
});
