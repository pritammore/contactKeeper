import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4 className="alert alert-warning text-center">Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null   
                        ? filtered.map((contact) => (
                            <CSSTransition key={contact._id} classNames="item" timeout={500}>
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        ))
                        : contacts.map((contact) => (
                            <CSSTransition key={contact._id} classNames="item" timeout={500}>
                                <ContactItem contact={contact} key={contact.id} />
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner/> }
        </Fragment>
    );
};

export default Contacts;
