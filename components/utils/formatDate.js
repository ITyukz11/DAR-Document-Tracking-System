import React from 'react'

export default function formatDate(dateData) {
   const formattedDate= new Date(dateData).toLocaleString('en-US', { dateStyle: 'short' })

  return (formattedDate)
}
