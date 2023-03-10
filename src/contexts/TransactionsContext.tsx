import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  type: 'income' | 'outcome'
  description: string
  price: number
  category: string
  createdAt: string
}

interface Category {
  id: number
  description: string
  type: string
  value: string
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (params?: object) => Promise<void>
  categorys: Category[]
  getDescriptionCategory: (category: string) => any
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categorys, setCategorys] = useState<Category[]>([])

  const fetchTransactions = useCallback(async (params?: object) => {
    console.log(params)
    const response = await api.get(`/transactions${''}`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        ...params,
      },
    })

    if (response.status === 200) {
      setTransactions(response.data)
    }
  }, [])

  async function fetchCategorys() {
    const response = await api.get('/categorys')
    if (response.status === 200) {
      setCategorys(response.data)
    }
  }

  function getDescriptionCategory(category: string) {
    const description = categorys.find(
      (item) => category === item.value,
    )?.description
    return description || ''
  }

  useEffect(() => {
    fetchCategorys()
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        categorys,
        getDescriptionCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
