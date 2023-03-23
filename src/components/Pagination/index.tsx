import { PaginationContainer } from './styles'
import {
  CaretLeft,
  CaretDoubleLeft,
  CaretRight,
  CaretDoubleRight,
} from 'phosphor-react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function Pagination() {
  const { transactions, fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return context
    },
  )

  console.log(transactions.pagination)

  return (
    <PaginationContainer>
      <nav>
        <span>
          {transactions.pagination.countItens > 0
            ? `Mostrando ${transactions.pagination.countItens} registros de um total de ${transactions.pagination.totalItens}`
            : `Nenhum registro encontrado`}
        </span>
        <ul>
          <li>
            <button
              onClick={() =>
                fetchTransactions({
                  _page: 0,
                })
              }
              disabled={transactions.pagination.currentPage === 1}
            >
              <CaretDoubleLeft size={22} />
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                fetchTransactions({
                  _page: transactions.pagination.currentPage - 1,
                })
              }
              disabled={transactions.pagination.currentPage === 1}
            >
              <CaretLeft size={22} />
            </button>
          </li>
          {transactions.pagination.pages.map((page) => {
            return (
              <li key={page}>
                <button
                  onClick={() => fetchTransactions({ _page: page })}
                  style={{
                    backgroundColor:
                      page === transactions.pagination.currentPage
                        ? '#00875F'
                        : '#323238',
                  }}
                >
                  {page}
                </button>
              </li>
            )
          })}
          <li>
            <button
              onClick={() =>
                fetchTransactions({
                  _page: transactions.pagination.currentPage + 1,
                })
              }
              disabled={
                transactions.pagination.currentPage ===
                transactions.pagination.totalPages
              }
            >
              <CaretRight size={22} />
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                fetchTransactions({
                  _page: transactions.pagination.totalPages,
                })
              }
              disabled={
                transactions.pagination.currentPage ===
                transactions.pagination.totalPages
              }
            >
              <CaretDoubleRight size={22} />
            </button>
          </li>
        </ul>
      </nav>
    </PaginationContainer>
  )
}
