import React, { Component } from 'react'
import { nanoid } from "nanoid";
import { ContainerContactsForm, ContainerContactsLabel, ConteinerContactsButton, ConteinerContactsInput } from './CotactsFormStyle';

export default class ContactsForm extends Component {
	state = {
		name: '',
		number: '',
	}

	hendleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value })

	}

	handleSubmit = event => {
		event.preventDefault();

		const contactsData = {
			id: nanoid(),
			name: this.state.name,
			number: this.state.number,
		}
		this.props.handleAddContact(contactsData);


		this.setState({
			name: '',
			number: '',
		});

	}
	render() {
		return (
			<ContainerContactsForm onSubmit={this.handleSubmit}>
				<ContainerContactsLabel>
					<span>Name</span>
					<ConteinerContactsInput onChange={this.hendleInputChange} value={this.state.name} type="text" name="name" required />
				</ContainerContactsLabel>
				<ContainerContactsLabel>
					<span>Number</span>
					<ConteinerContactsInput onChange={this.hendleInputChange} value={this.state.number} type="tel" name="number" required />
				</ContainerContactsLabel>
				<ConteinerContactsButton type="submit" >Add contact</ConteinerContactsButton>
			</ContainerContactsForm >
		)
	}
}
