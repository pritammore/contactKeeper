import React, {useContext, useEffect} from 'react';
import Contacts from '../contact/Contacts';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  // Added empty array to load user using useEffeect hook only while loading the component. Otherwise it will go in recrring loop.
  return (
        <div className="grid-2">
            <div>
              <ContactForm />
            </div>
            <div>
              <ContactFilter />
              <Contacts />
            </div>
        </div>
    )
}

export default Home;
