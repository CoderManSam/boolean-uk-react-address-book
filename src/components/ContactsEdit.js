import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit(props) {
  const { updateContacts, setUpdateContacts} = props
  const [contact, setContact] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
  
    fetch(`http://localhost:4000/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => setContact(data)); 
  }, []);

  if (!contact) {
    return <p>Loading</p>
  }

  const testValue = {}

  const testChange = (event) => {
    testValue[event.target.name] = event.target.value

    console.log("testValue", testValue)
  }

  const submitFormData = (event) => {
    event.preventDefault()

    fetch(`http://localhost:4000/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(testValue)
    })
    .then((res) => res.json())
    .then(()=> updateContacts ? setUpdateContacts(false) : setUpdateContacts(true))
    .then(navigate("/"));
  }

  return (

    <form className="form-stack contact-form" onSubmit={submitFormData}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">Edit First Name ({contact.firstName}):</label>
      <input id="firstName" name="firstName" type="text"  onChange={testChange}/>

      <label htmlFor="lastName">Edit Last Name ({contact.lastName}):</label>
      <input id="lastName" name="lastName" type="text" onChange={testChange}/>

      <label htmlFor="street">Edit Street ({contact.street}):</label>
      <input id="street" name="street" type="text" onChange={testChange}/>

      <label htmlFor="city">Edit City ({contact.city}):</label>
      <input id="city" name="city" type="text" onChange={testChange}/>

      <label htmlFor="email">Edit Email ({contact.email}):</label>
      <input id="email" name="email" type="email" onChange={testChange}/>

      <label htmlFor="linkedIn">Edit LinkedIn ({contact.linkedIn}):</label>
      <input id="linkedIn" name="linkedIn" type="text" onChange={testChange}/>

      <label htmlFor="twitter">Edit Twitter ({contact.twitter}):</label>
      <input id="twitter" name="twitter" type="text" onChange={testChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit