import React, { useState } from 'react'
import { RegistrationFormData } from './interface'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthContext } from '@/components/contexts/AuthContext'
import { toast } from 'sonner'

const RegisterPage: React.FC = () => {
  const { customFetch } = useAuthContext()

  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    password: '',
    negara_asal: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    customFetch('/api/auth/register/', {
      method: 'POST',
      body: JSON.stringify(formData),
    }).then((response) => toast(response.message))
  }

  return (
    <main className="py-28 flex justify-center items-center">
      <Card style={{ width: '300px' }}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="negara_asal" className="block mb-2">
                Negara Asal:
              </label>
              <input
                type="text"
                id="negara_asal"
                name="negara_asal"
                value={formData.negara_asal}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <CardFooter className="flex flex-col items-center mt-4">
              <Button type="submit" className="w-full mb-4">
                Register
              </Button>
              <a
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Sudah punya akun ? Login disini !
              </a>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default RegisterPage
