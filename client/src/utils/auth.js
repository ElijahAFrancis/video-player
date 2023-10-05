// <<<<<<< InstaClip
// // use this to decode a token and get the user's information out of it
// import decode from 'jwt-decode';

// // create a new class to instantiate for a user
// class AuthService {
//   // get user data from JSON web token by decoding it
// =======
// import decode from 'jwt-decode';

// class AuthService {
// >>>>>>> main
  getProfile() {
    return decode(this.getToken());
  }

// <<<<<<< InstaClip
//   // return `true` or `false` if token exists (does not verify if it's expired yet)
//   loggedIn() {
//     const token = this.getToken();
//     return token ? true : false;
// =======
//   loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         return true;
//       } else return false;
//     } catch (err) {
//       return false;
//     }
// >>>>>>> main
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
// <<<<<<< InstaClip
//     // Saves user token to localStorage and reloads the application for logged in status to take effect
//     localStorage.setItem('id_token', idToken);
// =======
//     // Saves user token to localStorage
//     localStorage.setItem('id_token', idToken);

// >>>>>>> main
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
// <<<<<<< InstaClip
//     window.location.reload();
//   }
// }

// export default new AuthService();
// =======
//     window.location.assign('/');
//   }
// }

// export default new AuthService();
// >>>>>>> main
