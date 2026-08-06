import React from "react"

import AccountNav from "../components/account-nav"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="content-container mx-auto flex h-full max-w-5xl flex-1 flex-col bg-konduit-raised">
        <div className="grid grid-cols-1 py-12 small:grid-cols-[240px_1fr]">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div
          className="flex flex-col items-start justify-between gap-6 border-t py-10 small:flex-row small:items-end"
          style={{ borderColor: "var(--color-divider)" }}
        >
          <div>
            <h3 className="mb-2 text-xl">Need help with an order?</h3>
            <p className="max-w-md text-sm opacity-75">
              Track its route or message us on WhatsApp: local numbers, local
              hours.
            </p>
          </div>
          <LocalizedClientLink href="/track" className="btn btn-secondary">
            Track an order
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
