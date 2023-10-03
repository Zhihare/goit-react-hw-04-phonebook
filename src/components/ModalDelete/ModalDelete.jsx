import React, { Component } from 'react'

import { ConteinerContactsButton } from 'components/ContactsForm/CotactsFormStyle';
import { ModalTitle, ModalWindow, Overlay } from 'components/Modal/ModalStyle';

export default class ModalDelete extends Component {

	deleteNumber = () => {
		this.props.handleDelete(this.props.deleteContact);
		this.props.onCloseModalDelete();
	}



	render() {
		return (
			<Overlay>
				<ModalWindow>
					<ModalTitle>Are you sure you want to delete {this.props.deleteContact}?</ModalTitle>
					<ConteinerContactsButton type="button"
						style={{
							width: '150px', height: '60px',
						}}
						onClick={() => this.deleteNumber()}>
						Yes</ConteinerContactsButton>
					<ConteinerContactsButton type="button"
						style={{
							width: '150px', height: '60px',
						}}
						onClick={() => this.props.onCloseModalDelete()}
					>No</ConteinerContactsButton>
				</ModalWindow>
			</Overlay>
		)
	}
}