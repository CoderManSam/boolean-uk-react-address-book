import { useState, useRef, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {
  
  //"contacts" must be passed as prop to this component

  const { contacts, updateContacts, setUpdateContacts } = props

  const deleteSpan = useRef();

  const spanHideOrReveal = () => {
    const deleteSpanCurrent = deleteSpan.current
    deleteSpanCurrent.hidden === true ? deleteSpanCurrent.removeAttribute('hidden') : deleteSpanCurrent.setAttribute('hidden', 'hidden')  
  }

  const deleteContact = (id) => {
    fetch(`http://localhost:4000/contacts/${id}`, {
        method: 'DELETE'
      })
      .then((res) => res.json())
      .then(()=> updateContacts ? setUpdateContacts(false) : setUpdateContacts(true))
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName, id } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p> 
                <Link to={`/contacts/${contact.id}`}>View</Link>
              </p>
              <p>
                <Link to={`/contacts/${contact.id}/edit`}>Edit</Link>
              </p>
              <button onClick={spanHideOrReveal}>
                Delete
              </button>
              <span hidden ref={deleteSpan}>
                <p>Are you sure you want to delete this contact?</p>
                <button onClick={() => deleteContact(id)}>
                  Yes
                </button>
                <button onClick={spanHideOrReveal}>
                  No
                </button>
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
