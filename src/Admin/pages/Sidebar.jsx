import React from 'react'
import {faArr} from 'react-icons'

const Sidebar = (props) => {
    const { result, lotto, soft, max } = props;

    const handleLi1 = () => {
        max(true)
        result(false)
        lotto(false)
        soft(false)
    }
    const handleLi2 = () => {
        max(false)
        result(true)
        lotto(false)
        soft(false)
    }
    const handleLi3 = () => {
        max(false)
        result(false)
        lotto(false)
        soft(true)
    }
    const handleLi4 = () => {
        max(false)
        result(false)
        lotto(true)
        soft(false)
    }

    return (
        <div className='sidebar'>
            <ul className='sidebar_list'>
                <li onClick={handleLi1} className='sidebarList_items'>Max Amount for direct games
                <span></span>
                </li>
                <li onClick={handleLi2} className='sidebarList_items'>Post Regular Lotto Results <span></span>
                </li>
                <li onClick={handleLi3} className='sidebarList_items'>Post Soft Lotto Odds
                <span></span>
                </li>
                <li onClick={handleLi4} className='sidebarList_items'>Post Lotto Express Odds
                <span></span>
                </li>
           </ul>
        </div>
    )
}

export default Sidebar
