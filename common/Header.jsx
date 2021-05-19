import React from 'react';
import PrimaryAppBar from './PrimaryAppBar';
import SubHeader from './SubHeader'

const Header = (props) => {
  return (
    <>
      <PrimaryAppBar route={props.route}/>
      <SubHeader  route={props.route}/>
    </>
  )
}

export default Header
