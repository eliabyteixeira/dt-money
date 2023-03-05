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

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
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
      type: 'income',
    },
  })

  const categorys = useContextSelector(TransactionsContext, (context) => {
    return context.categorys
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, type, category, price } = data

    const response = await api.post('/transactions', {
      description,
      type,
      category,
      price,
      createdAt: new Date(),
    })

    if (response.status === 201) {
      reset()
      onOpenChangeModal(false)
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
