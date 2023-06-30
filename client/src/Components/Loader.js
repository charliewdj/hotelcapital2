import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import { useState, CSSProperties } from "react";
//import styled, { css } from 'styled-components'

function Loader() {
    //const override = css`
        //display: block;
       // margin: 0 auto;
        //borderColor: red;
        



  let [loading, setLoading] = useState(true);


  return (
    <div style = {{marginTop : '150px'}}>
        <div className="sweet-loading text-center">
        <HashLoader color = '#000' loading = {loading} css = '' size = {80} />
    </div>
    </div>
  )
}

export default Loader