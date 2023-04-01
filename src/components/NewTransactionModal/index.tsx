import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { SelectCustom } from '../SelectCustom'
import { Controller, useForm } from 'react-hook-form'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { api } from '../../lib/axios'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateToSave } from '../../utils/formatter'
import { toast } from 'react-toastify'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
  createdAt: zod.date(),
})

// isso vai retornar a tipagem dos campos do formulario
type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  onOpenChangeModal: (value: boolean) => void
}

export function NewTransactionModal({
  onOpenChangeModal,
}: NewTransactionModalProps) {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'outcome',
    },
  })

  //  const { transactions, getDescriptionCategory, fetchTransactions } =
  //   useContextSelector(TransactionsContext, (context) => {
  //     return context
  //   })

  const { categorys, fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return context
    },
  )

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const response = await api.post('/transactions', {
      ...data,
      createdAt: dateToSave(data.createdAt),
    })

    if (response.status === 201) {
      toast.success('Nova transação cadastrada com sucesso!')
      reset()
      onOpenChangeModal(false)
      fetchTransactions({ _page: 0 })
    } else {
      toast.error('Ops... não foi possivel inclui uma nova transação!')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', {
              valueAsNumber: true,
            })}
          />

          <input
            type="date"
            placeholder="Data"
            required
            {...register('createdAt', {
              valueAsDate: true,
              maxLength: 10,
            })}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => {
              return (
                <SelectCustom
                  items={categorys}
                  defaultValue=""
                  onValueChange={field.onChange}
                  value={field.value}
                />
              )
            }}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
