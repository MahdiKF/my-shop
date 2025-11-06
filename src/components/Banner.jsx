"use  client"
import Link from 'next/link'
import React from 'react'

function Banner() {
    return (
        <div>
            <div>search box</div>

            {/* <p>login/regester</p> */}

            <Link href="/login">Login</Link>
        </div>
    )
}

export default Banner