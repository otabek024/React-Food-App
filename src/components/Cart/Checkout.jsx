import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = isEmpty(enteredName);
    const enteredStreetIsValid = isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

      if (!formIsValid) return;

      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
      })
  };

  const nameClasses = `${classes.control} ${!formInputValidity.name ? classes.invalid : ''}`
  const streetClasses = `${classes.control} ${!formInputValidity.street ? classes.invalid : ''}`
  const postalClasses = `${classes.control} ${!formInputValidity.postal ? classes.invalid : ''}`
  const cityClasses = `${classes.control} ${!formInputValidity.city ? classes.invalid : ''}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
