var React = require('react');
var ReactDOM = require('react-dom');
var Rx = require('rx');
var LoginView = require('./views/login-view.js');
var CreateAccountView = require('./views/create-account-view.js');
var fireabse = require('firebase/app');

var RedirectView = React.createClass({
    render: function() {
        document.location = this.props.to;
        return (<p>Redirecting...</p>)
    }
});

var SignOutView = React.createClass({
    render: function() {
        Rx.Observable.just('Sign out')
            .flatMap(() => Rx.Observable.fromPromise(firebase.auth().signOut()))
            .subscribe(() => { document.location = '#/'; });
        
        return (<p>Redirecting...</p>)
    }
});

var LoggedInView = React.createClass({
    render: function() {
        return (
            <div>
                <p>Logged in as <em>{ firebase.auth().currentUser.email }</em>!</p>
                <p><a href="#/sign-out/">Sign out</a></p>
            </div>
        )
    }
});



Rx.Observable.just('Routing')
    .flatMap(() => {
        // Initialization
        return Rx.Observable.create(function(observer) {
            firebase.auth().onAuthStateChanged(function(user) {
                observer.onNext(user);
                observer.onCompleted();
            });
        })
    })
    .flatMap(() => {
        return Rx.Observable.merge([
            Rx.Observable.just('initial load'),
            Rx.Observable.fromEvent(window, 'hashchange')
        ])
    })
    .map(() => document.location.hash || '' )
    .map((hash) => {
        if (fireabse.auth().currentUser) {
            // User has logged in
            switch(hash.substr(2)) {
                case 'sign-out/':
                    return <SignOutView />
                case '':
                    return <LoggedInView />;
                default:
                    return <RedirectView to='#/' />
            }
        } else {
            // User has NOT logged in
            switch(hash.substr(2)) {
                case 'create-account/':
                    return <CreateAccountView />;
                case '':
                    return <LoginView />;
                default:
                    return <RedirectView to='#/' />
            }
        }
    })
    .tapOnNext((view) => {
        ReactDOM.render(
            view,
            document.getElementsByTagName('main')[0]
        )
    })
    .subscribe();