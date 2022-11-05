import { useState } from 'react';
import { nanoid } from 'nanoid';
import { getContacts } from '../../../redux/contactsSlice';
import { addContact } from '../../../redux/AsyncRedux';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import css from '../ContactForm/ContactForm.module.css'

const nameId = nanoid();
const phoneId = nanoid();

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'contactName':
                setName(value)
                break;
            case 'contactNumber':
                setPhone(value)
                break;
            default:
                setName('')
                setPhone('')
        }
    }

    const dispatch = useDispatch();
    const {items} = useSelector(getContacts);

    const contactAlreadyExists = (name) => {
        return items.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    }

    const addContactToList = (id, name, phone) => {
        if (contactAlreadyExists(name)) {
            return toast.error(`${name} is already in Phonebook`)
        }

        dispatch(addContact({id, name, phone }))
        setName('')
        setPhone('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addContactToList(nanoid(), name, phone);
    }

    
    return (<form onSubmit={handleSubmit} className={css.insertWrapper}>
        <label className={css.label} htmlFor={nameId}>Name</label>
        <input
            id={nameId}
            type="text"
            name="contactName"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Input name'
            className={css.input} />
        <label className={css.label} htmlFor={phoneId}>Number</label>
        <input
            id={phoneId}
            type="tel"
            name="contactNumber"
            value={phone}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
                placeholder='Input number'
            className={css.input} />
        <button type='submit' className={css.button}>Add contact</button>
    </form>)
    
}
