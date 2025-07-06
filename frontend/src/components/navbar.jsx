import React from 'react';

const Navbar =()=>{
    return (
      <nav className='flex justify-between  bg-red-950 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
            <li className="cursor-pointer hover:font-bold transition-all duration-200">home</li>

            <li className="cursor-pointer hover:font-bold transition-all duration-200">your Task</li>
            </ul>
            </nav>
    )
}
export default Navbar