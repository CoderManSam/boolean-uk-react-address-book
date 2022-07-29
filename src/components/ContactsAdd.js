import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function ContactsAdd(props) {
  const { updateContacts, setUpdateContacts} = props

  const navigate = useNavigate()

  //TODO: Implement controlled form
  //send POST to json server on form submit

  const submitFormData = (event) => {

    const contact = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      street: event.target.street.value,
      city: event.target.city.value,
      email: event.target.email.value,
      linkedIn: event.target.linkedIn.value,
      twitter: event.target.twitter.value
    }

    fetch(`http://localhost:4000/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(contact)
    })
    .then((res) => res.json())
    .then(()=> updateContacts ? setUpdateContacts(false) : setUpdateContacts(true))
    .then(navigate("/"));
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

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required/>

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="text" required/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
