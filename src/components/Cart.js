import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'
export default class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createOrder = (e) => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        }
        this.props.createOrder(order)
    }


    render() {
        const { cartItems } = this.props
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is empty</div>
                ) : (
                    <div className="cart cart-header">You have {cartItems.length} items in the cart {" "} </div>
                )}
                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className="button" onClick={() => this.props.removeFromCart(item)}> Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total : {" "}
                                        {
                                            formatCurrency(cartItems.reduce((acc, current) => acc + current.price * current.count, 0))
                                        }
                                    </div>
                                    <button className="button primary" onClick={() => this.setState({ showCheckout: true })}>Proceed</button>
                                </div>
                            </div>
                            {this.state.showCheckout && (
                                <Fade right cascade>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" name="email" id="email" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" name="name" id="name" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <label htmlFor="address">Address</label>
                                                    <input type="text" name="address" id="address" required onChange={this.handleInput} />
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    }
}
