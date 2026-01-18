import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import ClientOnly from '@/components/client-only'
import { SectionCards } from '@/components/section-cards'
import React from 'react'

const page = () => {
  return (
    <ClientOnly>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
    </ClientOnly>
  )
}

export default page
