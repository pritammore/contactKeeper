import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    
    const {addContact, updateContact, clearCurrent, current } = contactContext;

    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
        type: 'personal'
    });

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        }else {
            setContact({
                name: '',
                phone: '',
                email: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]); 

    const { name, phone, email, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if(current !== null) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
        
        clearAll();
    }

    return (
        <form autoComplete='off' onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder='Email' name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder='Phone' name="phone" value={phone} onChange={onChange}/>
            <h5>Contact Type</h5>
            <input 
                type="radio" 
                name="type" 
                value="personal" 
                checked={type === 'personal' ? 'checked' : ''} 
                onChange={onChange} /> Personal{' '}
            <input 
                type="radio" 
                name="type" 
                value="professional" 
                checked={type === 'professional' ? 'checked' : ''} 
                onChange={onChange}/> Professional{' '}
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'/>
            </div>
            {current && <input type="button" value="Clear" className="btn btn-secondary btn-block" onClick={clearAll} />}
        </form>
    )
}

export default ContactForm
