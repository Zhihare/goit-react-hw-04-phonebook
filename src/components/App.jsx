import { Component } from "react"
import { GoSun } from 'react-icons/go';
import { HiMoon } from 'react-icons/hi';
import ContactsForm from "./ContactsForm/ContactsForm";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { ConteinerApp, ContentApp, TitleApp, ToogleDarkMode } from "./AppStyle";
import Modal from "./Modal/Modal";
import ModalDelete from "./ModalDelete/ModalDelete";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "constants/DarkMode";


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    modal: {
      isOpen: false,
      data: null,
    },
    modalDelete: {
      isOpen: false,
      data: null,
    },
    themes: {
      setTheme: "light",
      light: LightTheme,
      dark: DarkTheme,
    },
  }
  componentDidMount() {
    const stringifiedTheme = localStorage.getItem('theme');
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedTheme = JSON.parse(stringifiedTheme) ?? "light";
    const parsedContacs = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parsedContacs,
      themes: {
        setTheme: parsedTheme,
        light: LightTheme,
        dark: DarkTheme,
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const stringifiedTheme = JSON.stringify(this.state.themes.setTheme);
    localStorage.setItem('theme', stringifiedTheme);

    if (this.state.contacts.length !== prevState.contacts.length) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }


  handleAddContact = contactsData => {

    if (this.state.contacts.some(contact => contact.name === contactsData.name)) {
      alert(` A contact has already been created for this name: ${contactsData.name}`);
      return;
    }
    if (this.state.contacts.some(contact => contact.number === contactsData.number)) {
      alert(` A contact has already been created for this number: ${contactsData.number}`);
      return;
    }
    this.onOpenModal(contactsData.name);
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contactsData],
      };
    });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };


  handleDelete = contactName => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.name !== contactName),
      };
    });
  };

  onOpenModal = (modalData) => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  }

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  }

  onOpenModalDelete = (modalDataDelete) => {
    this.setState({
      modalDelete: {
        isOpen: true,
        data: modalDataDelete,
      },
    });
  }

  onCloseModalDelete = () => {
    this.setState({
      modalDelete: {
        isOpen: false,
        data: null,
      },
    });
  }


  changeTheme = () => {

    if (this.state.themes.setTheme === "light") {
      this.setState({
        themes: {
          setTheme: "dark",
          light: LightTheme,
          dark: DarkTheme,
        },
      });
    }
    else {
      this.setState({
        themes: {
          setTheme: "light",
          light: LightTheme,
          dark: DarkTheme,
        },
      });
    }
  };

  render() {
    const theme = this.state.themes.setTheme

    const icon = this.state.themes.setTheme === "light" ?
      <HiMoon size={30} /> :
      <GoSun size={30} />;

    return (
      <ThemeProvider theme={this.state.themes[theme]} >
        <ConteinerApp>
          <ContentApp>
            <TitleApp title="Phonebook">Phonebook</TitleApp>
            <ContactsForm handleAddContact={this.handleAddContact} />
            <TitleApp>Contacts</TitleApp>
            <Filter value={this.state.filter} filter={this.changeFilter} />
            <ContactsList
              renderFilter={this.getContacts()}
              onOpenModalDelete={this.onOpenModalDelete}
            />
            <ToogleDarkMode onClick={this.changeTheme}>{icon}</ToogleDarkMode>

            {this.state.modal.isOpen && <Modal
              newContactName={this.state.modal.data}
              onCloseModal={this.onCloseModal} />}

            {this.state.modalDelete.isOpen && <ModalDelete
              handleDelete={this.handleDelete}
              deleteContact={this.state.modalDelete.data}
              onCloseModalDelete={this.onCloseModalDelete} />}
          </ContentApp>
        </ConteinerApp>
      </ThemeProvider>
    );
  };
}
