import React from 'react'
import "./topbar.css"
import { NotificationsNone, Language, Settings } from '@material-ui/icons';

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className="topLeft">
                <span className="logo">lamaadmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Settings />
                </div>
                <img src="https://media.gettyimages.com/id/509819877/photo/woman-punting-bamboo-raft-across-lake.jpg?s=612x612&w=gi&k=20&c=3OecxmB_tTVPH9nj1CPKJi562Noo7DqaebBI-QNCgZA=" alt="" className="topAvatar" />

               
            </div>
        </div>
    </div>
  )
}