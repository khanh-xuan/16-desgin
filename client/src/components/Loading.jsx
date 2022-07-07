import React from 'react'
import { useSelector } from 'react-redux'

const Loading = (props) => {
    const loading = useSelector(state => state.loading.loading)

    return (
        <div className={`loading ${loading ? 'active' : ''}`}>
            <div className="loading__content">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Loading
