import React, { Component } from 'react'
import { Overlay, ModalWindow, ModalTitle } from './ModalStyle'
import { ConteinerContactsButton } from 'components/ContactsForm/CotactsFormStyle';

export default class Modal extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = event => {
		if (event.code === 'Escape') {
			this.props.onCloseModal();
		}
	};

	onOverlayClick = event => {
		if (event.currentTarget === event.target) {
			this.props.onCloseModal();
		}
	};



	render() {
		return (
			<Overlay onClick={this.onOverlayClick}>
				<ModalWindow>
					<ModalTitle>New contact {this.props.newContactName} added to the list</ModalTitle>
					<ConteinerContactsButton type="button"

						style={{
							width: '150px', height: '60px',
						}}
						onClick={() => this.props.onCloseModal()}>OK</ConteinerContactsButton>
				</ModalWindow>
			</Overlay>
		)
	}
}
