/**
 * External dependencies
 */
var React = require( 'react' ),
	joinClasses = require( 'react/lib/joinClasses' );

/**
 * Internal dependencies
 */
var Config = require( '../config.js' );
	Widget = require( '../widget' );


/**
 * Contact Widget Component
 */
Widget_Contact = React.createClass( {
	getInitialState: function(){
		return {
			user: Config.user,
			useremail: Config.useremail,
			message: '',
			status: '',
			formclass: '',
			cansubmit: true
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();

		this.setState({
			formclass: 'sending',
			cansubmit: false
		});

		var name = React.findDOMNode(this.refs.user).value.trim();
		var email = React.findDOMNode(this.refs.email).value.trim();
		var subject = React.findDOMNode(this.refs.subject).value.trim();
		var type = React.findDOMNode(this.refs.type).value.trim();
		var body = React.findDOMNode(this.refs.body).value.trim();
		var priority = React.findDOMNode(this.refs.priority).value.trim();

		data = {
			name: name,
			email: email,
			subject: subject,
			type: type,
			body: body,
			priority: priority,
			action: 'vip_contact'
		};

		jQuery.ajax({
			type: 'POST',
			url: Config.ajaxurl,
			data: data,
			success: function( data, textStatus, jqXHR ) {

				if ( textStatus == "success") {

					var result = jQuery.parseJSON(data);

					this.setState({
						message: result.message,
						status: result.status,
						formclass: 'form-' + result.status,
						cansubmit: true
					});

					// reset the form
					if ( result.status == "success" ) {
						React.findDOMNode(this.refs.subject).value = '';
						React.findDOMNode(this.refs.body).value = '';
						React.findDOMNode(this.refs.type).value = 'Technical';
						React.findDOMNode(this.refs.priority).value = 'Medium';
					}

				} else {

					this.setState({
						message: 'Your message could not be sent, please try again.',
						status: 'error',
						cansubmit: true
					});
				}
			}.bind(this)
		});


		return;
	},
	maybeRenderFeedback: function() {
		if ( this.state.message ) {
			return <div className={ 'contactform-' + this.state.status } dangerouslySetInnerHTML={{__html: this.state.message}}></div>;
		}
	},
	render: function() {
		return (
			<Widget className={ joinClasses( this.state.formclass, 'widget__contact-form' ) } title="Contact WordPress.com VIP Support">

				{ this.maybeRenderFeedback() }

				<form className="widget__contact-form" action="submit" method="get" onSubmit={this.handleSubmit}>
					<div className="contact-form__row">
						<label htmlFor="contact-form__name">Name</label>
						<input type="text" defaultValue={ this.state.user } id="contact-form__name" placeholder="First and last name" ref="user" />
					</div>
					<div className="contact-form__row">
						<label htmlFor="contact-form__email">Email</label>
						<input type="text" defaultValue={ this.state.useremail } id="contact-form__email" placeholder="Email address" ref="email"/>
					</div>
					<div className="contact-form__row">
						<label htmlFor="contact-form__subject">Subject</label>
						<input type="text" defaultValue="" id="contact-form__subject" placeholder="Ticket name" ref="subject" />
					</div>
					<div className="contact-form__row">
						<label htmlFor="contact-form__type">Type</label>
						<div className="contact-form__select">
							<select id="contact-form__type" ref="type" defaultValue="Technical">
								<option value="Technical">Technical</option>
								<option value="Business">Business/Project Management</option>
								<option value="Review">Theme/Plugin Review</option>
							</select>
						</div>
					</div>
					<div className="contact-form__row">
						<label htmlFor="contact-form__details">Details</label>
						<textarea name="details" rows="4" id="contact-form__details" placeholder="Please be descriptive" ref="body"></textarea>
					</div>
					<div className="contact-form__row">
						<label htmlFor="contact-form__priority">Priority</label>
						<select id="contact-form__priority" ref="priority" defaultValue="Medium">
							<optgroup label="Normal Priority">
								<option value="Low">Low</option>
								<option value="Medium">Normal</option>
								<option value="High">High</option>
							</optgroup>
							<optgroup label="Urgent Priority">
								<option value="Emergency">Emergency (Outage, Security, Revert, etc...)</option>
							</optgroup>
						</select>
					</div>
					<div className="contact-form__row">
						<input type="submit" value="Submit Request" disabled={!this.state.cansubmit} />
					</div>
				</form>
			</Widget>
		);
	}
} );
module.exports = Widget_Contact;