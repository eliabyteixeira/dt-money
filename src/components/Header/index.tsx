import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [openModal, setOpenModal] = useState<true | false>(false)

  function openChangeModal(open: boolean) {
    setOpenModal(open)
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <Dialog.Root
          open={openModal}
          onOpenChange={() => openChangeModal(!openModal)}
        >
          <Dialog.Trigger asChild>
            <NewTransactionButton onClick={() => openChangeModal(!openModal)}>
              Nova transação
            </NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal onOpenChangeModal={openChangeModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
