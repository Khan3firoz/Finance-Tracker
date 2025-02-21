import React from 'react'
import './index.scss'

function FloatingMenu() {
    return (
        <div>
            <nav className="circular-menu">
                <input className="circular-menu__button" id="circular-menu" type="checkbox" href="javascript: void 0" />
                <label className="circular-menu__icon" htmlFor="circular-menu">
                    <div className="hamburger hamburger-bar"></div>
                    <div className="hamburger hamburger-bar"></div>
                    <div className="hamburger hamburger-bar"></div>
                </label><a className="circular-menu__item" href="#"><i className="fa fa-chrome"></i></a><a className="circular-menu__item" href="#"><i className="fa fa-firefox"></i></a><a className="circular-menu__item" href="#"><i className="fa fa-edge"></i></a><a className="circular-menu__item" href="#"><i className="fa fa-safari"></i></a><a className="circular-menu__item" href="#"><i className="fa fa-opera"></i></a>
            </nav>
        </div>
    )
}

export default FloatingMenu