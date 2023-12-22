import Layout from '@/components/layout'
import { Search } from '@/components/utils/search'
import GeneralTable from '@/components/utils/tables/GeneralTable'
import React from 'react'
import { useDatas } from './api/Datas'

export default function Table() {
    const {prDatas} =  useDatas()
    return (
        <Layout>
            <div className='mt-44'>
            <GeneralTable tableData={prDatas}/>

            </div>
            
        </Layout>
    )
}
