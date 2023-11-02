import React from 'react'
import {AiTwotoneShopping} from 'react-icons/ai'

const Navbar = () => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex p-5 justify-center md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 mr-1">
                    <AiTwotoneShopping className='text-4xl'/>
                    <span className="text-xl">Shop</span>
                </a>
            </div>
        </header>
    )
}

export default Navbar