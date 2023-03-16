import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

type Pagination = {
  totalItens: number
  totalPages: number
  currentPage: number
  countItens: number
  pages: number[]
}
interface TransactionData {
  id: number
  type: 'income' | 'outcome'
  description: string
  price: number
  category: string
  createdAt: string
}
interface Transaction {
  data: TransactionData[]
  pagination: Pagination
}
interface Category {
  id: number
  description: string
  type: string
  value: string
}

type RequestProps = {
  _page?: number
  type?: string
  q?: string
}
interface TransactionsContextType {
  transactions: Transaction
  fetchTransactions: (params: RequestProps) => Promise<void>
  categorys: Category[]
  getDescriptionCategory: (category: string) => any
}

export const TransactionsContext = createContext({} as TransactionsContextType)
interface TransactionsProviderProps {
  children: ReactNode
}
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [categorys, setCategorys] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction>({
    data: [],
    pagination: {
      totalItens: 0,
      totalPages: 0,
      currentPage: 0,
      countItens: 0,
      pages: [],
    },
  })

  const fetchTransactions = useCallback(
    async ({ type, _page, q }: RequestProps) => {
      const params = {
        type,
        q,
        _sort: 'createdAt',
        _order: 'desc',
        _page,
        _limit: 10,
      }

      if (type === '') delete params.type
      if (q === '') delete params.q
      if (_page === 0) delete params._page

      const response = await api.get(`/transactions${''}`, { params })

      if (response.status === 200) {
        const totalCount: number = response.headers['x-total-count'] || 0
        const totalPages: number = Math.ceil(totalCount / 10) || 1

        setTransactions({
          data: response.data,
          pagination: {
            totalItens: Number(totalCount),
            totalPages,
            currentPage: _page || 1,
            countItens: response.data.length,
            pages: Array.from({ length: totalPages }, (v, k) => k + 1),
          },
        })
      }
    },
    [],
  )

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
    fetchTransactions({ _page: 0 })
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
