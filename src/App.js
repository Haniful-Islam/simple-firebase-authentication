
import './App.css';
import app from './firebase.init'
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);
 

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  //google sign in
  const handleGoogleSignIn =() => {
    signInWithPopup(auth, googleProvider)
    .then(result =>{
     const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error =>{
      console.log(error);
    })
    
  }
  //github sign in
  const handleGithubSignIn =() => {
    signInWithPopup(auth, githubProvider)
    .then((result) =>{
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error =>{
      console.error(error);
    })

  }
  //google sign out
  const handleSignOut =() => {
    signOut(auth)
    .then(() => {
      setUser({});  
    })
    .catch(error => {
      setUser({});
    })
  }
  return (
    <div className="App">
        {/* condition ? true : false */}
        {
          user.uid ?
          <button onClick={handleSignOut}>Sign out</button>
          :  
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </div>
        }
        <h1>Name:{user.displayName}</h1>
        <h4>My Eamil address:{user.email}</h4>
        <h4>My photo<img src={user.photoURL}></img></h4>
       
    </div>
  );
}

export default App;
