import React from 'react';
import Layout from '@/components/layout';
import { useDatas } from './api/Datas';
import { Search } from '@/components/utils/search';

export default function Document(){ 
const {prDatas} = useDatas()

  return (   
      <Layout>
        <Search datas={prDatas}/>asd
      </Layout>
  );
};


