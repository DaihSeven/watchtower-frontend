import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

export default function page() {
  return (
    <ProtectedRoute>
      <div>Página para onde o admin é redirecionado</div>
    </ProtectedRoute>
  )
}
