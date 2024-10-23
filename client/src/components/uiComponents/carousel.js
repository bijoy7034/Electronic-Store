// MainPage.js

import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const CarouselScreen = () => {

    const gadgets = [
        {
            id: 1,
            image: 'https://firebasestorage.googleapis.com/v0/b/gadget-a7f0c.appspot.com/o/ui%2Fiphones.png?alt=media&token=490835b2-b67e-44de-bcae-d3d4bb418a80',
            title: 'iPhone 16 Special Offer',
            description: 'Get up to $200 off on the new iPhone 16 with A16 Bionic Chip. Limited time offer!',
            details: 'Offer valid until November 30, 2024. Available in all storage options.',
            buttonText: 'Shop iPhone 16 Now',
        },
        {
            id: 2,
            image: 'https://firebasestorage.googleapis.com/v0/b/gadget-a7f0c.appspot.com/o/ui%2Fiphone.png?alt=media&token=14e5399a-3cc4-4d40-ad34-32f455b8a09a',
            title: 'Samsung Galaxy Z Fold Exclusive Deal',
            description: 'Save 15% on the Samsung Galaxy Z Fold with a free pair of Galaxy Buds.',
            details: 'Free Galaxy Buds available with every purchase. Offer ends on October 31, 2024.',
            buttonText: 'Buy Galaxy Z Fold',
        },

    ];

    return (
        <div>
            <Carousel>
                {gadgets.map(gadget => (
                    <Carousel.Item key={gadget.id}>
                        <div className="d-flex align-items-center justify-content-between  h-100">
                            <div className="p-4 m-5">
                                <h3 className='text-warning'><b>{gadget.title}</b></h3>
                                <span>{gadget.description}</span>

                                <button className="btn btn-warning">{gadget.buttonText}</button>
                            </div>
                            <img
                                className="d-block w-50 img-fluid"
                                src={gadget.image}
                                alt={gadget.title}

                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselScreen;
