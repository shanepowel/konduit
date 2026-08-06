"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { NAV_LINKS, QUOTE_MAILTO } from "@lib/constants/brand"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import CurrencySelect from "../currency-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  activeCurrency?: string | null
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  activeCurrency,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-konduit-ink"
                >
                  Menu
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/0 pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-[51] inset-x-0 text-sm m-2">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between rounded-soft border border-konduit-line bg-konduit-paper p-6 text-konduit-ink shadow-sm"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-5 items-start justify-start">
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <LocalizedClientLink
                            href={link.href}
                            className="font-display text-2xl leading-10 hover:text-konduit-blue"
                            onClick={close}
                          >
                            {link.label}
                          </LocalizedClientLink>
                        </li>
                      ))}
                      <li>
                        <LocalizedClientLink
                          href="/account"
                          className="font-display text-2xl leading-10 hover:text-konduit-blue"
                          onClick={close}
                        >
                          Sign in
                        </LocalizedClientLink>
                      </li>
                      <li>
                        <a
                          href={QUOTE_MAILTO}
                          className="font-display text-2xl leading-10 hover:text-konduit-blue"
                          onClick={close}
                        >
                          Request a quote
                        </a>
                      </li>
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      {regions && (
                        <CurrencySelect
                          regions={regions}
                          activeCurrency={activeCurrency}
                        />
                      )}
                      {!!locales?.length && (
                        <div
                          className="flex justify-between"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                      <div
                        className="flex justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <p className="text-xs text-konduit-muted">
                        © {new Date().getFullYear()} Konduit Ltd.
                      </p>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
