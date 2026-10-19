import { useEffect, useMemo, useRef, useState } from 'react'
import { GlobalPresetsCard } from './components/cards/GlobalPresetsCard'
import { ReviewTemplateCard, type ReviewEditStep } from './components/cards/ReviewTemplateCard'
import { SelectBrandsCard } from './components/cards/SelectBrandsCard'
import { SelectVendorsCard } from './components/cards/SelectVendorsCard'
import { WizardLayout } from './components/layouts/WizardLayout'
import { ToastRegion, type ToastMessage } from './components/molecules/Toast'
import { MainNavigation } from './components/navigation/MainNavigation'
import { Stepper } from './components/navigation/Stepper'
import { WizardNavigation } from './components/navigation/WizardNavigation'
import { appBrands, appVendors } from './data/appData'
import { isBrandStepComplete } from './data/brands'
import { currentDay, initialPresets, type GlobalPresetsValue } from './data/presets'
import { byVendorName, type Vendor } from './data/vendors'

type Step = 1 | 2 | 3 | 4

// Page titles change only between steps, with no step number (code-backlog "Page titles").
const titles: Record<Step, string> = {
  1: 'Add vendors – Template Builder',
  2: 'Add brands – Template Builder',
  3: 'Add pricing defaults – Template Builder',
  4: 'Review template – Template Builder',
}

const editTarget: Record<ReviewEditStep, Step> = { vendors: 1, brands: 2, presets: 3 }

/*
  The Template Builder wizard: vendors → brands → presets (optional) → review.
  Picks are kept when moving between steps. Vendors are only edited on step 1: going back, removing
  a vendor and returning drops that vendor's brand picks (Will, Oct 18). Review's Edit jumps to that
  step and the normal wizard carries on from there (no special return to Review).
  TODO(step-transition): Next / Back swap the card instantly; the stepper charge-up and card
  transition come later (Stepper.tsx).
*/
function App() {
  const [step, setStep] = useState<Step>(1)
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])
  const [selectedBrandIds, setSelectedBrandIds] = useState<Set<string>>(() => new Set())
  const [presets, setPresets] = useState<GlobalPresetsValue>(initialPresets)
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const isFirstRender = useRef(true)
  const today = useMemo(() => currentDay(), [])

  // Step 2 only offers the brands of the vendors picked on step 1.
  const stepBrands = useMemo(
    () => appBrands.filter((brand) => selectedVendors.some((vendor) => vendor.id === brand.vendorId)),
    [selectedVendors],
  )
  // Review lists vendors A–Z, like step 2 (docs/open-questions.md, "Review order").
  const vendorsAZ = useMemo(() => [...selectedVendors].sort(byVendorName), [selectedVendors])
  const selectedBrands = useMemo(() => stepBrands.filter((brand) => selectedBrandIds.has(brand.id)), [stepBrands, selectedBrandIds])

  useEffect(() => {
    document.title = titles[step]
    setToast(null)
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

  function download() {
    // The spec leaves download to the app; a placeholder until there's a real export (Will, Oct 18).
    setToast({ id: Date.now(), message: 'Download isn’t built yet' })
  }

  const footer = {
    1: (
      <WizardNavigation
        next={{ label: 'Select brands', onPress: goToBrands }}
        canContinue={selectedVendors.length > 0}
        hint="Add at least one vendor to continue."
      />
    ),
    2: (
      <WizardNavigation
        back={{ label: 'Edit vendors', onPress: () => setStep(1) }}
        next={{ label: 'Set presets', onPress: () => setStep(3) }}
        canContinue={isBrandStepComplete(selectedVendors, stepBrands, selectedBrandIds)}
        hint="Add at least one brand for every vendor to continue."
      />
    ),
    // Presets are optional: Next is never blocked.
    3: (
      <WizardNavigation
        back={{ label: 'Edit brands', onPress: () => setStep(2) }}
        next={{ label: 'Review template', onPress: () => setStep(4) }}
        canContinue
      />
    ),
    4: (
      <WizardNavigation
        back={{ label: 'Edit presets', onPress: () => setStep(3) }}
        next={{ label: 'Download template', icon: 'download', onPress: download }}
        canContinue
      />
    ),
  }[step]

  return (
    <WizardLayout
      header={<MainNavigation variant="focus" onExit={() => {}} />}
      stepper={<Stepper currentStep={step} />}
      footer={footer}
      toast={<ToastRegion toast={toast} onDismiss={() => setToast(null)} />}
    >
      {step === 1 && <SelectVendorsCard vendors={appVendors} selected={selectedVendors} onChange={setSelectedVendors} />}
      {step === 2 && (
        <SelectBrandsCard vendors={selectedVendors} brands={stepBrands} selectedIds={selectedBrandIds} onChange={setSelectedBrandIds} />
      )}
      {step === 3 && <GlobalPresetsCard value={presets} onChange={setPresets} today={today} />}
      {step === 4 && (
        <ReviewTemplateCard
          vendors={vendorsAZ}
          selectedBrands={selectedBrands}
          presets={presets}
          today={today}
          onEdit={(target) => setStep(editTarget[target])}
        />
      )}
    </WizardLayout>
  )
}

export default App
