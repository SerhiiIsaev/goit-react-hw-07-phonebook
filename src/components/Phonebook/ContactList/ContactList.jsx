import React from 'react';
import { useSelector } from 'react-redux';
import { getContacts } from '../../../redux/contactsSlice';
import { getFilter } from '../../../redux/filterSlice';
import { ContactItem } from '../ContactItem/ContactItem';

export const ContactList = () => {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        }
        
        return contacts.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const contactsToRender = getFilteredContacts()

    return <ul style={{ paddingLeft: "0px" }}>
        {contactsToRender.map(item =>
            <ContactItem key={item.id} data={item} />)
        }
    </ul>
}