import React from 'react';
import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import '../../styles/navbar.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Autocomplete from 'react-autocomplete';
import Autosuggest from "react-autosuggest";
import firebase from "../firebase/base";
import './theme.css';

function Navigation() {
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    const fetchdata = async () => {
      await firebase.db
        .collection("characters")
        .get()
        .then((querySnapshot) => {
          setItems(querySnapshot.docs.map((doc) => doc.data()));
          console.log(items);
        });
    };

    fetchdata();
  });


  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : items.filter(lang =>
      lang.characterName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.characterName;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.characterName}
    </div>
  );
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };
  

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]); 
   };
  const inputProps = {
    placeholder: 'Type a course',
    value,
    onChange: onChange
  };
  
  return (
    <>
      <Navbar bg="white" className="sticky-top">
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="/assets/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <Nav.Link href="/explore">Explore</Nav.Link>
        </Nav>
        {/* <Form 
        className="center-search"
        > */}
          {/* <input
            className="search-input"
            width="100%"
            type="text"
            placeholder="Search..."
          /> */}
         <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
          
         
          <SearchIcon className="search" style={{ fontSize: 30 }} />  
        {/* </Form> */}
        <Nav className="ml-auto">
          <Nav.Link href="/About">About</Nav.Link>
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/signin">Login</NavDropdown.Item>
            <NavDropdown.Item href="/signup">Register</NavDropdown.Item>
            <NavDropdown.Item href="/signout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
}

export default Navigation;
