import { Button, Flex } from 'antd';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthProvider';
const firebaseConfig = {
  apiKey: 'AIzaSyBIXj7F0pP6UmhcVEDPruRyNg6q-pGdf4E',
  authDomain: 'adr-manager-d997b.firebaseapp.com',
  databaseURL: 'https://adr-manager-d997b-default-rtdb.firebaseio.com',
  projectId: 'adr-manager-d997b',
  storageBucket: 'adr-manager-d997b.appspot.com',
  messagingSenderId: '888556353848',
  appId: '1:888556353848:web:e29b562d0febad3ea829cd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export default function Authentication() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/app');
    }
  }, [isLoggedIn, navigate]);

  const startSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        localStorage.setItem(
          'auth',
          JSON.stringify({
            email: auth.currentUser?.email,
            token,
          }),
        );

        return axios.post('/api/user/', {
          email: auth.currentUser?.email,
          token,
        });
      })
      .then(() => {
        return setIsLoggedIn(true);
      })
      .catch((error: { code: number | string; message: string }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Code: ${errorCode} \nmessage: ${errorMessage}`);
      });
  };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        flex={1}
        style={{ width: '100%', height: '100%' }}
      >
        <Button type="primary" onClick={startSignIn}>
          SignIn with Google
        </Button>
      </Flex>
    </>
  );
}
