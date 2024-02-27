import React from 'react'

export const InfoCard = ({title, seconds}:{title:string, seconds:number}) => {
  return (
    <div id="InspiracaoDiv" className="cutdown">
        <h2 className="cutdown-title">{title}</h2>
        <p id="InspText" className="cutdown text">{seconds} s</p>
    </div>
  )
}
