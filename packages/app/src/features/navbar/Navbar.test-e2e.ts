import { test } from '@playwright/test'
import { mainnet } from 'viem/chains'

import { overrideAirdropInfoRoute } from '@/test/e2e/airdropInfo'
import { DEFAULT_BLOCK_NUMBER } from '@/test/e2e/constants'
import { setup } from '@/test/e2e/setup'
import { setupFork } from '@/test/e2e/setupFork'

import { NavbarPageObject } from './Navbar.PageObject'

test.describe('Navbar', () => {
  const fork = setupFork({ blockNumber: DEFAULT_BLOCK_NUMBER, chainId: mainnet.id })

  test.describe('Airdrop counter', () => {
    test('Disconnected', async ({ page }) => {
      await setup(page, fork, {
        initialPage: 'easyBorrow',
        account: {
          type: 'not-connected',
        },
      })

      const navbar = new NavbarPageObject(page)
      await navbar.expectAirdropCompactValue('0')
      await navbar.hoverOverAirdropBadge()
      await navbar.expectAirdropPreciseValue('0 SPK')
    })

    test('Connected', async ({ page }) => {
      const { account } = await setup(page, fork, {
        initialPage: 'easyBorrow',
        account: {
          type: 'connected',
        },
      })

      await overrideAirdropInfoRoute(page, { account })

      const navbar = new NavbarPageObject(page)
      await navbar.expectAirdropCompactValue('7.841M')
      await navbar.hoverOverAirdropBadge()
      await navbar.expectAirdropPreciseValue('7,840,591')
    })

    test('Api error', async ({ page }) => {
      const { account } = await setup(page, fork, {
        initialPage: 'easyBorrow',
        account: {
          type: 'connected',
        },
      })

      await overrideAirdropInfoRoute(page, { account, shouldFail: true })

      const navbar = new NavbarPageObject(page)
      await navbar.expectAirdropBadgeNotVisible()
    })

    test('Wallet with no airdrop', async ({ page }) => {
      const { account } = await setup(page, fork, {
        initialPage: 'easyBorrow',
        account: {
          type: 'connected',
        },
      })

      await overrideAirdropInfoRoute(page, { account, noAirdrop: true })

      const navbar = new NavbarPageObject(page)
      await navbar.expectAirdropCompactValue('0')
      await navbar.hoverOverAirdropBadge()
      await navbar.expectAirdropPreciseValue('0 SPK')
    })
  })
})
