"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { NAV_LINKS } from "@lib/constants/brand"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRight, Menu, X } from "lucide-react"
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
                  className="relative flex h-full items-center transition-all duration-200 ease-out focus:outline-none hover:text-[var(--color-accent)]"
                  aria-label="Open menu"
                >
                  <Menu size={20} strokeWidth={2.75} />
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="pointer-events-auto fixed inset-0 z-[50] bg-black/0"
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
                <PopoverPanel className="absolute inset-x-0 z-[51] m-2 flex h-[calc(100vh-1rem)] w-full flex-col pr-4 text-sm sm:w-1/3 sm:min-w-min sm:pr-0 2xl:w-1/4">
                  <div
                    data-testid="nav-menu-popup"
                    className="card elev-md flex h-full flex-col justify-between p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        aria-label="Close menu"
                      >
                        <X size={22} strokeWidth={2.75} />
                      </button>
                    </div>
                    <ul className="flex flex-col items-start justify-start gap-5">
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <LocalizedClientLink
                            href={link.href}
                            className="font-heading text-2xl leading-10 no-underline hover:text-[var(--color-accent)]"
                            onClick={close}
                          >
                            {link.label}
                          </LocalizedClientLink>
                        </li>
                      ))}
                      <li>
                        <LocalizedClientLink
                          href="/account"
                          className="font-heading text-2xl leading-10 no-underline hover:text-[var(--color-accent)]"
                          onClick={close}
                        >
                          Sign in
                        </LocalizedClientLink>
                      </li>
                      <li>
                        <LocalizedClientLink
                          href="/quote"
                          className="font-heading text-2xl leading-10 no-underline hover:text-[var(--color-accent)]"
                          onClick={close}
                        >
                          Request a quote
                        </LocalizedClientLink>
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
                          <ArrowRight
                            size={16}
                            strokeWidth={2.75}
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
                        <ArrowRight
                          size={16}
                          strokeWidth={2.75}
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <p className="text-xs opacity-60">
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
