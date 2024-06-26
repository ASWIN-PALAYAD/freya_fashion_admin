import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/customers/CustomersColumns'
import { Separator } from '@/components/ui/separator'
import Customer from '@/lib/models/Customer'
import { connectDb } from '@/lib/mongoDB'

const Customers = async () => {
  await connectDb()

  const customers = await Customer.find().sort({ createdAt: "desc" })

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={customers} searchKey='name'/>
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Customers