var React = require('react');
var LoggedOutFormView = require('./logged-out-form-view.js');
var FormEmailInput = require('../components/form-email-input.js');

const ForgotPasswordView = props => (
    <LoggedOutFormView
        submitButtonTitle="Send password reset email"
        title="Password reset"
        onSubmit={ props.onSubmit }
        error={ props.error }
        success={ props.success && "Password reset link sent to your email" }
        >
        <FormEmailInput
            onChange={ props.onEmailChange }
            />
    </LoggedOutFormView>
);

module.exports = ForgotPasswordView;
/*
React.createClass({
    getInitialState: function() {
        return { email: '', isSending: false, showError: false, showSuccess: false };
    },
    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({ showError: false });
        
        var email = this.state.email.trim();
        if (!email) {
            this.setState({ showError: true });
            return;
        }
        
        Rx.Observable.just('Try sending password reset')
            .tapOnNext(() => {
                this.setState({ isSending: true, showError: false });
            })
            .flatMap(() => {
                return Rx.Observable.fromPromise(
                    firebaseAuth().sendPasswordResetEmail(email)
                );
            })
            .subscribe(
                (x) => {
                    this.setState({ isSending: false, showSuccess: true });
                },
                (err) => {
                    this.setState({ isSending: false, showError: true });
                }
            );
        
        
    },
    render: function() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <h2>Password reset</h2>
                <p>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="john.doe@mailinator.com"
                        value={ this.state.email }
                        onChange={ this.handleEmailChange }
                    />
                </p>
                { this.state.showError &&
                    <p className="error">{ `There is no user with this email` }</p>
                }
                { this.state.showSuccess &&
                    <p className="success">{ `Password reset link sent to your email` }</p>
                }
                <p>
                    <Button color="yellow" type="submit" disabled={ this.state.isSending }>Send password reset email</Button>
                </p>
            </form>
        )
    }
});
*/
