import React from 'react';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { removeContact } from '../../../redux/AsyncRedux'; 
import css from '../ContactItem/ContactItem.module.css'

export const ContactItem = ({ data }) => {
    const dispatch = useDispatch();

    const { id, name, phone } = data;
    return <li className={css.contactItem}>
        <p className={css.contactText}>{name}: {phone}</p>
        <button type='button' className={css.contactBtn} onClick={() => dispatch(removeContact(id))}>Delete</button>
    </li>
}

ContactItem.propTypes = {
    data: PropTypes.objectOf(PropTypes.string.isRequired,),
}