import React from 'react'

function Container({children}) {
  return (
    <div className="container mx-auto w-auto">
      {children}
    </div>
  )
}

export default Container;
