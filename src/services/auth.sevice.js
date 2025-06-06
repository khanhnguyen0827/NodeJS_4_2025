
const authService = {
  isAuthenticated: false,
  login: (req, res) => {
    // Logic for user login
    // For example, check credentials and set isAuthenticated to true
    authService.isAuthenticated = true;
    res.send("User logged in successfully");
  },
  logout: (req, res) => {
    // Logic for user logout
    // For example, reset isAuthenticated to false
    authService.isAuthenticated = false;
    res.send("User logged out successfully");    
  },
  register: (req, res) => {
    // Logic for user registration
    // For example, save user details to the database
    res.send("User registered successfully");
  } ,
  }

  export default authService