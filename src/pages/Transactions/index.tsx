import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Loader } from '../../components/Loader'
import { Pagination } from '../../components/Pagination'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  FilterContainer,
} from './styles'

export function Transactions() {
  const { transactions, getDescriptionCategory, fetchTransactions } =
    useContextSelector(TransactionsContext, (context) => {
      return context
    })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <FilterContainer>
          <button onClick={() => fetchTransactions({})} autoFocus={true}>
            Tudo
          </button>
          <button onClick={() => fetchTransactions({ type: 'income' })}>
            Entradas
          </button>
          <button onClick={() => fetchTransactions({ type: 'outcome' })}>
            Saídas
          </button>
        </FilterContainer>
        <SearchForm />
        {transactions.data.length === 0 ? (
          <Loader />
        ) : (
          <TransactionsTable>
            <table>
              <tbody>
                {transactions?.data.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td width="50%">{transaction.description}</td>
                      <td>
                        <PriceHighLight variant={transaction.type}>
                          {transaction.type === 'outcome' ? '-' : '+'}{' '}
                          {priceFormatter.format(transaction.price)}
                        </PriceHighLight>
                      </td>
                      <td>{getDescriptionCategory(transaction.category)}</td>
                      <td>
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TransactionsTable>
        )}
      </TransactionsContainer>
      <Pagination />
    </div>
  )
}
