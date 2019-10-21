import React from 'react';
import './Profile.css';

export default class extends React.Component {
    state = {
        user: { ...this.props.user }
    };

    onFormChange = (event) => {
        const user = {
            ...this.state.user,
        };
        switch (event.target.name) {
            case 'user-name':
                user['name'] = event.target.value;
                this.setState({ user });
                break;
            case 'user-age':
                user['age'] = event.target.value;
                this.setState({ user });
                break;
            case 'user-pet':
                user['pet'] = event.target.value;
                this.setState({ user });
                break;
            default:
                return;
        }
    }

    onProfileUpdate = () => {
        const { user } = this.state;
        fetch(`http://localhost:3030/profile/${this.state.user.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                formInput: {
                    name: user.name,
                    pet: user.pet,
                    age: user.age,
                }
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 304) {
                    this.props.toggleModal();
                    this.props.loadUser({ ...user });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { user } = this.state;
        const { toggleModal } = this.props;

        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="h3 w3 dib" alt="avatar" />
                        <h1>{user.name}</h1>
                        <h4>Images Submitted: {user.entries}</h4>
                        <p>Member since: {user.joined}</p>
                        <hr />
                        <label className="mt-2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.name}
                            type="text"
                            name="user-name"
                            id="name"
                        />
                        <label className="mt-2 fw6" htmlFor="age">Age:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.age}
                            type="text"
                            name="user-age"
                            id="age"
                        />
                        <label className="mt-2 fw6" htmlFor="pet">Pet:</label>
                        <input
                            onChange={this.onFormChange}
                            className="pa2 ba w-100"
                            placeholder={user.pet}
                            type="text"
                            name="user-pet"
                            id="pet"
                        />
                        <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button
                                className="b pa2 grow pointer hover-white w-60 bg-light-blue b--black-20"
                                onClick={this.onProfileUpdate}>Save</button>
                            <button
                                className="b pa2 grow pointer hover-white w-60 bg-light-red b--black-20"
                                onClick={toggleModal}>Cancel</button>
                        </div>
                    </main>
                    <div className="modal-close fw2" onClick={toggleModal}>&times;</div>
                </article>
            </div>
        )
    }
}