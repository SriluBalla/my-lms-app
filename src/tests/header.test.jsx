// src/tests/Header.test.jsx
import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

test('renders site logo', () => {
  render(<Header />)
  expect(screen.getByText(/My LMS/i)).toBeInTheDocument()
})
