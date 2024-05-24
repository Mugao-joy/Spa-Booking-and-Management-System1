import React, { useEffect, useState } from "react";
import facial from '../assets/facial.jpg'
import massage from '../assets/massage.jpg'
import laser from '../assets/laser (2).jpg'
import waxing from '../assets/bikini.jpg'
import LED from '../assets/LED.jpg'
import dermabrasion from '../assets/chemical peel.jpg'
import CPeel from '../assets/dermabrasion.jpg'
import prenatal from '../assets/prenatal.jpg'
import cupping from '../assets/cupping.jpg'
import hotstone from '../assets/hotstone.jpg'
import Navbar from './Navbar'
import contactimage from '../assets/huepink.jpg'
import { Link, useNavigate,  } from "react-router-dom";
import { usePaystackPayment } from 'react-paystack';
import './booking.css';

function Booking() {
    const [selectedServices, setSelectedServices] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentCompleted, setPaymentCompleted] = useState(false) //track payment completion
    const navigate = useNavigate()

    const handleCheckbox = (service, price) => {
        const index = selectedServices.indexOf(service)
        if (index === -1){
            setSelectedServices([...selectedServices, service])
            setTotalPrice(totalPrice + price)
        } else {
            const updatedServices = [...selectedServices]
            updatedServices.splice(index, 1)
            setSelectedServices(updatedServices)
            setTotalPrice(totalPrice - price)
        }
    }

    const isServiceSelected = (service) => {
        return selectedServices.includes(service)
    }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: totalPrice * 100, // Amount is in kobo (lowest currency unit), so multiply by 100 to convert to kobo
        publicKey: 'pk_test_fff5ca05942db65879579d4477b6b0c835c99826',
        currency: 'KES'
    };

    const onSuccess = (reference) => {
        console.log(reference);
        setPaymentCompleted(true)//set payment completion to true
    };

    const onClose = () => {
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    const handleProceedToPayment = () => {
        if (selectedServices.length === 0){
            alert ('Select a Service to Proceed')
        } else {
            initializePayment(onSuccess, onClose);
        }
    }

    useEffect(() => {
        if (paymentCompleted) {
            navigate( 'https://calendly.com/bowana2019' )
        }
    }, [paymentCompleted])

    return (
        <div style={{ backgroundColor: '#D5D6BD' }}>
            <div>
                <Navbar/>
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={facial} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Facials</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">HydraFacial</h2>
                                <p className="mt-1">5000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('HydraFacial')}
                                        onChange={() => handleCheckbox('HydraFacial', 5000)}/>
                                <span className="text-sm">Check to select</span>
                                {isServiceSelected('HydraFacial')}
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={dermabrasion}/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Facials</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Microdermabrasion</h2>
                                <p className="mt-1">7,500 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Microdermabrasion')}
                                        onChange={() => handleCheckbox('Microdermabrasion', 7500)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={LED}/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Facials</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">LED Light Therapy</h2>
                                <p className="mt-1">5000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('LED Light Therapy')}
                                        onChange={() => handleCheckbox('LED Light Therapy', 5000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={CPeel}/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Facials</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Hyluronic Chemical Peel</h2>
                                <p className="mt-1">6,500 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Hyluronic Chemical Peel')}
                                        onChange={() => handleCheckbox('Hyluronic Chemical Peel', 6500)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={waxing} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Waxing Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Full Body Wax</h2>
                                <p className="mt-1">10,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Full Body Wax')}
                                        onChange={() => handleCheckbox('Full Body Wax', 10000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={massage} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Waxing Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Legs Waxing</h2>
                                <p className="mt-1">$3,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Legs Waxing')}
                                        onChange={() => handleCheckbox('Legs Waxing', 3000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/427x267" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Waxing Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Brazilian Wax</h2>
                                <p className="mt-1">3,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Brazilian Wax')}
                                        onChange={() => handleCheckbox('Brazilian Wax', 3000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/428x268" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Waxing Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Hollywood Wax</h2>
                                <p className="mt-1">4,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Hollywood Wax')}
                                        onChange={() => handleCheckbox('Hollywood Wax', 4000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={massage} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Massages</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Aromatherapy Massage</h2>
                                <p className="mt-1">5,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Aromatherapy Massage')}
                                        onChange={() => handleCheckbox('Aromatherapy Massage', 5000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={cupping} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Massages</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Cupping Therapy</h2>
                                <p className="mt-1">6,500 KES KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Cupping Therapy')}
                                        onChange={() => handleCheckbox('Cupping Therapy', 6500)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={hotstone} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Massages</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Hotstone Massage</h2>
                                <p className="mt-1">7,500 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Hotstone Massage')}
                                        onChange={() => handleCheckbox('Hotstone Massage', 7500)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={prenatal} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Massages</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Prenatal Massage</h2>
                                <p className="mt-1">6,500 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Prenatal Massage')}
                                        onChange={() => handleCheckbox('Prenatal Massage', 6500)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={laser} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Laser Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Full Body Laser</h2>
                                <p className="mt-1">100,000 KES</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Full Body Laser')}
                                        onChange={() => handleCheckbox('Full Body Laser', 100000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={laser} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Laser Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Arms Laser</h2>
                                <p className="mt-1">5,000 KES/session</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Arms Laser')}
                                        onChange={() => handleCheckbox('Arms Laser', 5000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={laser} />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Laser Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Bikini/Hollywood Laser</h2>
                                <p className="mt-1">15,000 KES/session</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Bikini/Hollywood Laser')}
                                        onChange={() => handleCheckbox('Bikini/Hollywood Laser', 15000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={laser}/>
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Laser Hair Removal</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Legs Laser</h2>
                                <p className="mt-1">25,000 KES/session</p>
                                <input type="checkbox" className="mr-2 leading-tight" checked={isServiceSelected('Legs Laser')}
                                        onChange={() => handleCheckbox('Legs Laser', 25000)}/>
                                <span className="text-sm">Check to select</span>
                            </div>
                        </div>
                        <div className="fixed bottom-10 right-10">
                            <a href="#payment" className="flex items-center justify-center bg-indigo-500 text-white rounded-full w-12 h-12">
                                <span className="text-lg">↓</span>
                            </a>
                        </div>
                        <div className="flex justify-center mt-4">
                            <input type="text" placeholder="Enter coupon code" className=" coupon-input " />
                            <button className= "coupon-button">
                                Apply Coupon
                            </button>
                        </div>
                        <section id="payment" className="text-gray-600 body-font">
                            <div className="container px-5 py-24 mx-auto">
                                <button onClick={handleProceedToPayment} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Proceed to Payment
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Booking