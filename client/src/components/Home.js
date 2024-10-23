import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import CarouselScreen from "./uiComponents/carousel";
import { useEffect } from "react";
import axios from "axios";
import SectionWhy from "./uiComponents/section1";
import Product from "./uiComponents/productCard";
import { useProduct } from "../context/productContext";
import Slider from 'react-slick';
import Footer from "./uiComponents/footer";
import NavBar from "./uiComponents/navbar";

const Home = () => {
    const navigate = useNavigate();
    const { products } = useProduct();
    console.log(products)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            const token = localStorage.getItem('access');

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/customer/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.created === false) {
                    navigate('/profile/create');
                } else {
                    console.log(response.data);
                }
            } catch (err) {
                console.log('Error fetching customer profile:', err.response?.data);
            }
        };

        fetchCustomerProfile();
    }, [navigate]); // Add navigate as a dependency



    return (
        <div className="home">
            <NavBar />
            <CarouselScreen />
            <SectionWhy />

            <div className="container my-5">
                <h3 className="text-center mb-4">Featured Products</h3>
                <Slider {...settings}>
                    {products && products.map((product) => (
                        <Product product={product} />
                    ))}</Slider>
            </div>
            <section class="mt-5 mb-4">
                <div class="container text-dark">
                    <header class="mb-4">
                        <h3>Blog posts</h3>
                    </header>

                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                            <article>
                                <a href="#" class="img-fluid">
                                    <img class="rounded w-100" src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/1.webp" style={{objectFit: "cover", height :"160"}} />
                                </a>
                                <div class="mt-2 text-muted small d-block mb-1">
                                    <span>
                                        <i class="fa fa-calendar-alt fa-sm"></i>
                                        23.12.2022
                                    </span>
                                    <a href="#"><h6 class="text-dark">How to promote brands</h6></a>
                                    <p>When you enter into any new area of science, you almost reach</p>
                                </div>
                            </article>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                            <article>
                                <a href="#" class="img-fluid">
                                    <img class="rounded w-100" src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/2.webp" style={{objectFit: "cover", height :"160"}} />
                                </a>
                                <div class="mt-2 text-muted small d-block mb-1">
                                    <span>
                                        <i class="fa fa-calendar-alt fa-sm"></i>
                                        13.12.2022
                                    </span>
                                    <a href="#"><h6 class="text-dark">How we handle shipping</h6></a>
                                    <p>When you enter into any new area of science, you almost reach</p>
                                </div>
                            </article>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                            <article>
                                <a href="#" class="img-fluid">
                                    <img class="rounded w-100" src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/3.webp" style={{objectFit: "cover", height :"160"}} />
                                </a>
                                <div class="mt-2 text-muted small d-block mb-1">
                                    <span>
                                        <i class="fa fa-calendar-alt fa-sm"></i>
                                        25.11.2022
                                    </span>
                                    <a href="#"><h6 class="text-dark">How to promote brands</h6></a>
                                    <p>When you enter into any new area of science, you almost reach</p>
                                </div>
                            </article>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                            <article>
                                <a href="#" class="img-fluid">
                                    <img class="rounded w-100" src="https://mdbootstrap.com/img/bootstrap-ecommerce/posts/4.webp" style={{objectFit: "cover", height :"160"}} />
                                </a>
                                <div class="mt-2 text-muted small d-block mb-1">
                                    <span>
                                        <i class="fa fa-calendar-alt fa-sm"></i>
                                        03.09.2022
                                    </span>
                                    <a href="#"><h6 class="text-dark">Success story of sellers</h6></a>
                                    <p>When you enter into any new area of science, you almost reach</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
