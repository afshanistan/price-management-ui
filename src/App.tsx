import { useState } from 'react'
import { SelectVendorsCard } from './components/cards/SelectVendorsCard'
import { WizardLayout } from './components/layouts/WizardLayout'
import { MainNavigation } from './components/navigation/MainNavigation'
import { Stepper } from './components/navigation/Stepper'
import { WizardNavigation } from './components/navigation/WizardNavigation'
import { vendors, type Vendor } from './data/vendors'

/*
  The Template Builder. For now: the page shell with step 1's card, as is.
  Next step: wizard state, the four steps, Next / Back / Edit, page titles.
*/
function App() {
  // Only the card's own selection, so it works. Not wizard state yet.
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])

  return (
    <WizardLayout
      header={<MainNavigation variant="focus" onExit={() => {}} />}
      stepper={<Stepper currentStep={1} />}
      footer={
        <WizardNavigation
          next={{ label: 'Select brands', onPress: () => {} }}
          canContinue={selectedVendors.length > 0}
          hint="Add at least one vendor to continue."
        />
      }
    >
      <SelectVendorsCard vendors={vendors} selected={selectedVendors} onChange={setSelectedVendors} />
    </WizardLayout>
  )
}

export default App
