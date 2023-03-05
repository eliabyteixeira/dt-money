import * as Select from '@radix-ui/react-select'
import { Content, Item, Trigger, Viewport } from './styles'
import { CaretDoubleDown, CaretDown, CaretDoubleUp } from 'phosphor-react'

interface Items {
  id: number
  description: string
  type?: string
  value: string
}
interface SelectProps {
  items: Items[]
  defaultValue?: string
  onValueChange: (value: string) => void
  value: string
}
export function SelectCustom({
  items,
  defaultValue,
  onValueChange,
  value,
}: SelectProps) {
  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      <Trigger>
        <Select.Value placeholder="Selecione uma categoria" />
        <Select.Icon asChild>
          <CaretDown size={24} />
        </Select.Icon>
      </Trigger>
      <Select.Portal>
        <Content position="popper" sideOffset={1} side="bottom" align="end">
          <Select.ScrollUpButton asChild>
            <CaretDoubleUp size={20} />
          </Select.ScrollUpButton>
          <Viewport>
            {items.map((item) => {
              return (
                <Item key={item.id} value={item.value}>
                  <Select.ItemText>{item.description}</Select.ItemText>
                  <Select.ItemIndicator />
                </Item>
              )
            })}
            <Select.Arrow />
            <Select.ScrollDownButton asChild>
              <CaretDoubleDown size={20} />
            </Select.ScrollDownButton>
          </Viewport>
        </Content>
      </Select.Portal>
    </Select.Root>
  )
}
