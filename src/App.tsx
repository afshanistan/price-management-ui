import { useEffect, useMemo, useRef, useState } from 'react'
import { SelectBrandsCard } from './components/cards/SelectBrandsCard'
import { SelectVendorsCard } from './components/cards/SelectVendorsCard'
import { WizardLayout } from './components/layouts/WizardLayout'
import { MainNavigation } from './components/navigation/MainNavigation'
import { Stepper } from './components/navigation/Stepper'
import { WizardNavigation } from './components/navigation/WizardNavigation'
import { appBrands, appVendors } from './data/appData'
import { isBrandStepComplete } from './data/brands'
import type { Vendor } from './data/vendors'

type Step = 1 | 2

// Page titles change only between steps, with no step number (code-backlog "Page titles").
const titles: Record<Step, string> = {
  1: 'Add vendors – Template Builder',
  2: 'Add brands – Template Builder',
}

/*
  The Template Builder wizard. Steps 1–2 for now; 3 (presets) and 4 (review) come next.
  Picks are kept when moving between steps. Vendors are only edited on step 1: going back, removing
  a vendor and returning drops that vendor's brand picks (Will, Oct 18).
  TODO(step-transition): Next / Back swap the card instantly; the stepper charge-up and card
  transition come later (Stepper.tsx).
*/
function App() {
  const [step, setStep] = useState<Step>(1)
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])
  const [selectedBrandIds, setSelectedBrandIds] = useState<Set<string>>(() => new Set())
  const isFirstRender = useRef(true)

  // Step 2 only offers the brands of the vendors picked on step 1.
  const stepBrands = useMemo(
    () => appBrands.filter((brand) => selectedVendors.some((vendor) => vendor.id === brand.vendorId)),
    [selectedVendors],
  )

  useEffect(() => {
    document.title = titles[step]
    // On a step change (not the first load), focus the new card's heading so it's announced.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    document.querySelector<HTMLElement>('main h1')?.focus()
  }, [step])

  function goToBrands() {
    // Drop brand picks of vendors removed on step 1.
    setSelectedBrandIds((ids) => new Set([...ids].filter((id) => stepBrands.some((brand) => brand.id === id))))
    setStep(2)
  }

  const footer =
    step === 1 ? (
      <WizardNavigation
        next={{ label: 'Select brands', onPress: goToBrands }}
        canContinue={selectedVendors.length > 0}
        hint="Add at least one vendor to continue."
      />
    ) : (
      <WizardNavigation
        back={{ label: 'Edit vendors', onPress: () => setStep(1) }}
        // TODO(step-3): Set presets (step 3) isn't wired into the app yet.
        next={{ label: 'Set presets', onPress: () => {} }}
        canContinue={isBrandStepComplete(selectedVendors, stepBrands, selectedBrandIds)}
        hint="Add at least one brand for every vendor to continue."
      />
    )

  return (
    <WizardLayout
      header={<MainNavigation variant="focus" onExit={() => {}} />}
      stepper={<Stepper currentStep={step} />}
      footer={footer}
    >
      {step === 1 ? (
        <SelectVendorsCard vendors={appVendors} selected={selectedVendors} onChange={setSelectedVendors} />
      ) : (
        <SelectBrandsCard vendors={selectedVendors} brands={stepBrands} selectedIds={selectedBrandIds} onChange={setSelectedBrandIds} />
      )}
    </WizardLayout>
  )
}

export default App
