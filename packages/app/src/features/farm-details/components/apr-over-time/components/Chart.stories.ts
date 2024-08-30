import { Meta, StoryObj } from '@storybook/react'
import { getMobileStory, getTabletStory } from '@storybook/viewports'

import { Percentage } from '@/domain/types/NumericValues'
import { WithClassname } from '@storybook/decorators'
import { Chart } from './Chart'

const meta: Meta<typeof Chart> = {
  title: 'Features/FarmDetails/Components/AprOverTime/Components/Chart',
  component: Chart,
  decorators: [WithClassname('max-w-lg')],
  args: {
    height: 320,
    data: [
      { apr: Percentage('0.04'), date: new Date('2024-07-01T00:00:00') },
      { apr: Percentage('0.08'), date: new Date('2024-07-02T00:00:00') },
      { apr: Percentage('0.065'), date: new Date('2024-07-05T00:00:00') },
      { apr: Percentage('0.065'), date: new Date('2024-07-10T00:00:00') },
      { apr: Percentage('0.065'), date: new Date('2024-07-15T00:00:00') },
      { apr: Percentage('0.14'), date: new Date('2024-07-20T00:00:00') },
      { apr: Percentage('0.13'), date: new Date('2024-07-22T00:00:00') },
      { apr: Percentage('0.12'), date: new Date('2024-07-23T00:00:00') },
      { apr: Percentage('0.10'), date: new Date('2024-07-25T00:00:00') },
      { apr: Percentage('0.09'), date: new Date('2024-07-26T00:00:00') },
      { apr: Percentage('0.08'), date: new Date('2024-07-27T00:00:00') },
      { apr: Percentage('0.07'), date: new Date('2024-07-28T00:00:00') },
      { apr: Percentage('0.06'), date: new Date('2024-07-29T00:00:00') },
      { apr: Percentage('0.05'), date: new Date('2024-07-30T00:00:00') },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Chart>

export const Desktop: Story = {}
export const Mobile = getMobileStory(Desktop)
export const Tablet = getTabletStory(Desktop)