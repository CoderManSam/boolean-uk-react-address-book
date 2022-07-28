import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  const { setContacts, contacts} = props

  const [newContact, setNewContact] = useState({})

  //TODO: Implement controlled form
  //send POST to json server on form submit

  useEffect(() => {

    if(newContact.hasOwnProperty('firstName')) {
      fetch(`http://localhost:4000/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newContact)
      })
        .then((res) => res.json())
        .then((data) => setContacts(data)); 
    }
  }, [newContact]);

  const submitFormData = (event) => {

    const contact = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      street: event.target.street.value,
      city: event.target.city.value
    }

    console.log("contact", contact)

    setNewContact(contact)
  }

  return (
    <form className="form-stack contact-form" onSubmit={submitFormData}>
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
