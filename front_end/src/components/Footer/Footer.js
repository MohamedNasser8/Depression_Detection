import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import "./Footer.css"

function Header() {

    return (
        <div>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
                        <a href="#"> DepFigh</a>.
                            </p>
                        </div>

                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="instagram" href="#"><i className="fa fa-instagram"></i></a></li>
                                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Header;