import { useState } from 'react';
import { nanoid } from 'nanoid';
import { addContact, getContacts } from '../../../redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getData, removeData, addData } from 'API/API';
import css from '../ContactForm/ContactForm.module.css'
import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'contactName':
                setName(value)
                break;
            case 'contactNumber':
                setNumber(value)
                break;
            default:
                setName('')
                setNumber('')
        }
    }

    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    const contactAlreadyExists = (name, number) => {
        return contacts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    }

    const addContactToList = (name, number) => {
        if (contactAlreadyExists(name, number)) {
            return alert(`${name} is already in Phonebook`);
        }

        dispatch(addContact({ name, number }))
        setName('')
        setNumber('')
        removeData(5)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addContactToList(name, number);
    }

    const nameId = nanoid();
    const numberId = nanoid();
    
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
        <label className={css.label} htmlFor={numberId}>Number</label>
        <input
            id={numberId}
            type="tel"
            name="contactNumber"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
                placeholder='Input number'
            className={css.input} />
        <button type='submit' className={css.button}>Add contact</button>
    </form>)
}