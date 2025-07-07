'use client'

import React, { createContext, use, useEffect, useState } from 'react'
import type {
  AuthContext,
  Create,
  ForgotPassword,
  Login,
  Logout,
  ResetPassword,
  User,
} from './types'
import { rest } from './rest'
import useBuilderSoilDataStore from '@/stores/builder-soil-data-store'
import useLandscapeStore from '@/stores/landscape-store'
// import { headers } from 'next/headers'

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

   const { resetSoilData } = useBuilderSoilDataStore()
   const { reset } = useLandscapeStore()

  const create: Create = async (args) => {
    const user = await rest(`/api/creator`, args)
    setUser(user)
    return user
  }

  const login: Login = async (args) => {
    const user = await rest(`/api/creator/login`, args)
    setUser(user)
    return user
  }

  const logout: Logout = async () => {
    await rest(`/api/creator/logout`)
    reset()
    resetSoilData()
    setUser(null)
    return
  }

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true)
      const user = await rest(
        `/api/creator/me`,
        {},
        {
          method: 'GET',
        },
      )
      setUser(user)
      setIsLoading(false)
    }

    void fetchMe()
  }, [])

  const forgotPassword: ForgotPassword = async (args) => {
    try {
      const res = await fetch(`/api/creator/forgot-password`, {
        method: 'POST',
        body: JSON.stringify(args),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await res.json()

      if (res.ok) {
        return result
      }
    } catch (e: unknown) {
      throw new Error(e as string)
    }
  }

  const resetPassword: ResetPassword = async (args) => {
    //  const user = await rest(`/api/creator/reset-password`, args)
    //  // setUser(user)
    //  return user
    try {
      const res = await fetch(`/api/creator/reset-password`, {
        method: 'POST',
        body: JSON.stringify(args),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${args.token}`,
        },
      })

      const { errors, user } = await res.json()
      if (errors) {
        throw new Error(errors[0].message)
      }
      if (res.ok) {
        setUser(user)
        return user
      }
    } catch (e: unknown) {
      throw new Error(e as string)
    }
  }

  return (
    <Context
      value={{
        create,
        forgotPassword,
        login,
        logout,
        resetPassword,
        setUser,
        user,
        setIsLoading,
        isLoading,
      }}
    >
      {children}
    </Context>
  )
}

type UseAuth<T = User> = () => AuthContext

export const useAuth: UseAuth = () => use(Context)
