import { formatPercentage } from '@/domain/common/format'
import { AssetsGroup, Farm } from '@/domain/farms/types'
import { Button } from '@/ui/atoms/button/Button'
import { Panel } from '@/ui/atoms/panel/Panel'
import { testIds } from '@/ui/utils/testIds'
import { FarmStatsRow } from '../farm-stats-row/FarmStatsRow'

export interface FarmInfoPanelProps {
  assetsGroupType: AssetsGroup['type']
  farm: Farm
  hasTokensToDeposit: boolean
  walletConnected: boolean
  openStakeDialog: () => void
}

export function FarmInfoPanel({
  assetsGroupType,
  farm,
  hasTokensToDeposit,
  walletConnected,
  openStakeDialog,
}: FarmInfoPanelProps) {
  return (
    <Panel.Wrapper
      className="flex min-h-[380px] w-full flex-1 flex-col justify-between self-stretch px-6 py-6 md:px-[32px]"
      data-testid={testIds.farmDetails.infoPanel.panel}
    >
      <div className="flex max-w-[75%] flex-col gap-4">
        <h2 className="font-semibold text-2xl md:text-3xl">
          Stake {assetsGroupToText(assetsGroupType)} <br />
          and earn <span className="text-[#3F66EF]">{formatPercentage(farm.apy, { minimumFractionDigits: 0 })}</span>{' '}
          APY
        </h2>
        <div className="text-basics-dark-grey">
          Deposit the {assetsGroupToText(assetsGroupType)} from those available below and start farming{' '}
          {farm.rewardToken.symbol} token.
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <FarmStatsRow apy={farm.apy} depositors={farm.depositors} tvl={farm.totalSupply} />
        <div className="hidden border-basics-border border-t md:block" />
        <Button
          className="w-full"
          disabled={!walletConnected || !hasTokensToDeposit}
          onClick={openStakeDialog}
          data-testid={testIds.farmDetails.infoPanel.stakeButton}
        >
          Stake
        </Button>
      </div>
    </Panel.Wrapper>
  )
}

function assetsGroupToText(assetsGroupType: AssetsGroup['type']): string {
  switch (assetsGroupType) {
    case 'stablecoins':
      return 'stablecoins'
    case 'governance':
      return 'governance tokens'
  }
}
