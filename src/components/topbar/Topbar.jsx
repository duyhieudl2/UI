import React from 'react';
import './topbar.css';
import logo from '~/images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
    const navigate = useNavigate();

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo" onClick={() => navigate('/')}>
                        <img src={logo} alt="logo" />
                    </span>
                </div>
                <div className="topRight">
                    <img
                        src="https://media.gettyimages.com/id/509819877/photo/woman-punting-bamboo-raft-across-lake.jpg?s=612x612&w=gi&k=20&c=3OecxmB_tTVPH9nj1CPKJi562Noo7DqaebBI-QNCgZA="
                        alt=""
                        className="topAvatar"
                    />
                </div>
            </div>
        </div>
    );
}
