import { useBlockExplorerAddressLink } from '@/domain/hooks/useBlockExplorerAddressLink'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import BoxArrowTopRight from '@/ui/assets/box-arrow-top-right.svg?react'
import { Address } from '@/ui/atoms/address/Address'
import { Link } from '@/ui/atoms/link/Link'
import { cn } from '@/ui/utils/style'

interface BlockExplorerAddressLinkProps {
  address: CheckedAddress
  chainId?: number
  className?: string
}

export function BlockExplorerAddressLink({ address, chainId, className }: BlockExplorerAddressLinkProps) {
  const contractLink = useBlockExplorerAddressLink({ address, chainId })

  return contractLink ? (
    <Link
      to={contractLink}
      external
      className={cn(
        'flex w-full max-w-64 items-center gap-1 text-inherit hover:text-inherit hover:underline',
        className,
      )}
    >
      <Address address={address} postfix={<BoxArrowTopRight className="h-3.5 w-3.5 shrink-0" />} />
    </Link>
  ) : (
    <span className="flex w-full max-w-64 items-center gap-1">
      <Address address={address} />
    </span>
  )
}