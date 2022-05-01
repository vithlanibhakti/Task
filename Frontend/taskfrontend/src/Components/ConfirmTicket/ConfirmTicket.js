import React, { useState ,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Confirm,Toast } from '../../Helpers/CommonHelper';
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
function ConfirmTicket() {
    const location = useLocation();
    const navigation = useNavigate()
    const [show, setShow] = useState(false)
    console.log("lova", location?.state?.finalData.totalprice)
    useEffect(() => {
        Confirm.fire({
            icon: 'warning',
            title: "Are you sure you want to continue payment ?"
        }).then((result) => {
            if (!result.isConfirmed) {
                navigation("/");
            }
            else {
                setShow(true);
            }
    
        })
       
    }, [])
const handleSubmit = (() => {
    navigation("/");
    Toast.fire({
        icon: 'sucess',
        title: "Payment feature will launch soon"
    })
})
    return (
        <>
            {setShow && <>
                <div class="row">
                    <div class="col-75">
                        <div class="container">
                            <form >

                                <div class="row">
                                   
                                    <div class="col-50">
                                        <h3>Payment</h3>
                                        <label for="fname">Accepted Cards</label>
                                        <div class="icon-container">
                                            <i class="fa fa-cc-visa" style={{ 'color': 'navy' + 'em' }} ></i>
                                            <i class="fa fa-cc-amex" style={{ 'color': 'blue' }}></i>
                                            <i class="fa fa-cc-mastercard" style={{ 'color': 'red' }} ></i>
                                            <i class="fa fa-cc-discover" style={{ 'color': 'orange' }} ></i>
                                        </div>
                                        <label for="cname">Name on Card</label>
                                        <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                                        <label for="ccnum">Credit card number</label>
                                        <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                        <label for="expmonth">Exp Month</label>
                                        <input type="text" id="expmonth" name="expmonth" placeholder="September" />
                                        <div class="row">
                                            <div class="col-50">
                                                <label for="expyear">Exp Year</label>
                                                <input type="text" id="expyear" name="expyear" placeholder="2018" />
                                            </div>
                                            <div class="col-50">
                                                <label for="cvv">CVV</label>
                                                <input type="text" id="cvv" name="cvv" placeholder="352" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <Button className="button" onClick={handleSubmit} type="submit">
                                Continue to checkout
            </Button>
                                {/* <input type="submit" value="Continue to checkout" class="btn" /> */}
                            </form>
                        </div>
                    </div>
                    <div class="col-25">
                        <div class="container">
                            <p>Total <span class="price" style={{ 'color': 'black' }}><b>{location?.state?.finalData.totalprice}</b></span></p>
                        </div>
                    </div>
                </div>
            </>

            }
        </>
    )
}

export default ConfirmTicket