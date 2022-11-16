import React, { useState, useContext } from "react";
// import './Spectrogram.css'
import { AppContext } from "../../contexts/index";
import axios from 'axios'

function Spectrogram() {
    const {
        inputFile
      } = useContext(AppContext);

      
    const [showSpectrogram , setShowSpectrogram] = useState(false)
    const [showImg , setShowImg] = useState()
    const handleClick = () => {
       setShowSpectrogram(!showSpectrogram)
    //    axios.get(`http://localhost:5000/api/file/${inputFile}`
    //    ).then((response) => {
    //     console.log(response)
    //     setShowImg(response.data)
    //    }).catch((err) => {
    //     console.log(err)
    //    })
    }


    

  return (
    <div>
        <button onClick={handleClick} className="spectrogram-btn">Spectrogram</button>
        
        {showSpectrogram ? <img src={`http://localhost:5000/api/spectrogram/mod`} alt="specto" />
         : <img src={`http://localhost:5000/api/spectrogram/${inputFile}`} alt="specto" />}
        
    </div>
  )
}

export default Spectrogram